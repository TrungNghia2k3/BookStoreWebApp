import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  CalculatorFill,
  Grid,
  Receipt,
  StarFill,
  Truck,
} from "react-bootstrap-icons";
import {
  BsBox,
  BsBuilding,
  BsChatDots,
  BsClipboardData,
  BsPeople,
  BsTags,
} from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import DashboardCard from "../../components/admin/dashboard/DashboardCard";
import OrderDetailsModal from "../../components/admin/order/OrderDetailsModal";
import { getAllCategories } from "../../services/categoryService";
import { getAllCoupons } from "../../services/couponService";
import { getAllFeedbacks } from "../../services/feedbackService";
import { getAllManufactures } from "../../services/manufacturesService";
import {
  getAllOrdersWithOrderPlacedStatus,
  getOrderById,
  getOrderSummary,
  updateOrderStatus,
} from "../../services/orderService";
import {
  getAllProducts,
  rankingMostPopularProducts,
} from "../../services/productService";
import { getAllPublishers } from "../../services/publisherService";
import { getAllPaginationSorUsers } from "../../services/userService";
import { formatCurrencyVND, formatDateWithAmPm } from "../../utilities/Utils";

const DashboardAdmin = () => {
  const [dashboardData, setDashboardData] = useState({
    numberUsers: "",
    numberProducts: "",
    numberCategories: "",
    numberPublishers: "",
    numberOrders: "",
    numberFeedbacks: "",
    numberManufactures: "",
    numberCoupons: "",
    totalSale: "",
  });

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    console.log("🔄 Fetching dashboard data...");
    console.log("📡 API Gateway:", process.env.REACT_APP_API_GATEWAY || "Using fallback URL");
    
    try {
      // Fetch data with individual error handling to prevent one failure from breaking everything
      const results = await Promise.allSettled([
        getAllPaginationSorUsers().catch(err => {
          console.error("Users fetch failed:", err);
          return { totalElements: 0 };
        }),
        getAllProducts().catch(err => {
          console.error("Products fetch failed:", err);
          return { totalElements: 0 };
        }),
        getAllCategories().catch(err => {
          console.error("Categories fetch failed:", err);
          return { result: [] };
        }),
        getAllPublishers().catch(err => {
          console.error("Publishers fetch failed:", err);
          return { result: [] };
        }),
        getOrderSummary().catch(err => {
          console.error("Order summary fetch failed:", err);
          return { result: { totalOrders: 0, totalSale: 0 } };
        }),
        getAllFeedbacks().catch(err => {
          console.error("Feedbacks fetch failed:", err);
          return { result: [] };
        }),
        getAllManufactures().catch(err => {
          console.error("Manufactures fetch failed:", err);
          return { result: [] };
        }),
        getAllCoupons().catch(err => {
          console.error("Coupons fetch failed:", err);
          return { result: [] };
        }),
        rankingMostPopularProducts().catch(err => {
          console.error("Ranking products fetch failed:", err);
          return { result: [] };
        }),
        getAllOrdersWithOrderPlacedStatus().catch(err => {
          console.error("Placed orders fetch failed:", err);
          return { result: [] };
        }),
      ]);

      // Extract values from settled promises
      const [
        usersResponse,
        productsResponse,
        categoriesResponse,
        publishersResponse,
        ordersResponse,
        feedbacksResponse,
        manufacturesResponse,
        couponsResponse,
        rankingProductsResponse,
        placedOrdersResponse,
      ] = results.map(result => result.status === 'fulfilled' ? result.value : result.reason || {});

      console.log("✅ Dashboard data fetched");
      console.log("📊 Users:", usersResponse?.totalElements || 0);
      console.log("📊 Products:", productsResponse?.totalElements || 0);

      setDashboardData({
        numberUsers: usersResponse?.totalElements || 0,
        numberProducts: productsResponse?.totalElements || 0,
        numberCategories: categoriesResponse?.result?.length || 0,
        numberPublishers: publishersResponse?.result?.length || 0,
        numberOrders: ordersResponse?.result?.totalOrders || 0,
        numberFeedbacks: feedbacksResponse?.result?.length || 0,
        numberManufactures: manufacturesResponse?.result?.length || 0,
        numberCoupons: couponsResponse?.result?.length || 0,
        totalSale: ordersResponse?.result?.totalSale || 0,
      });

      setOrders(placedOrdersResponse?.result || []);
      setProducts(rankingProductsResponse?.result || []);
      
      // Debug logging for products structure
      console.log("📦 Orders data:", placedOrdersResponse?.result?.length || 0, "orders");
      console.log("⭐ Products data:", rankingProductsResponse?.result?.length || 0, "products");
      if (rankingProductsResponse?.result?.length > 0) {
        console.log("📦 First product structure:", rankingProductsResponse.result[0]);
      }
      
      // Check if any requests failed
      const failedCount = results.filter(r => r.status === 'rejected').length;
      if (failedCount > 0) {
        console.warn(`⚠️ ${failedCount} out of 10 API calls failed, but showing available data`);
        toast.warning(`Some data couldn't be loaded. Showing available information.`);
      }
    } catch (error) {
      console.error("❌ Critical error fetching dashboard data:", error);
      console.error("Error details:", error.response?.data || error.message);
      setError("Failed to load dashboard data. Please try again later.");
      toast.error("Failed to load dashboard data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const {
    numberUsers,
    numberProducts,
    numberCategories,
    numberPublishers,
    numberOrders,
    numberFeedbacks,
    numberManufactures,
    numberCoupons,
    totalSale,
  } = dashboardData;

  const handleShowOrderDetails = async (orderId) => {
    try {
      const orderDetails = await getOrderById(orderId);
      setSelectedOrder(orderDetails.result);
      setNewStatus(orderDetails.result.orderStatus);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (selectedOrder) {
        await updateOrderStatus(selectedOrder.id, newStatus);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id
              ? { ...order, orderStatus: newStatus }
              : order
          )
        );
        toast.success("Updated status successfully");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case "ORDER_PLACED":
        return "status-placed";
      case "SHIPPED":
        return "status-shipped";
      case "DELIVERED":
        return "status-delivered";
      case "CANCELLED":
        return "status-cancelled";
      default:
        return "";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading dashboard data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger m-5" role="alert">
        <h4 className="alert-heading">Error Loading Dashboard</h4>
        <p>{error}</p>
        <hr />
        <Button variant="primary" onClick={fetchDashboardData}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <Row>
        <DashboardCard
          title="Users"
          value={numberUsers || 0}
          icon={<BsPeople />}
          link="/admin/users"
        />
        <DashboardCard
          title="Products"
          value={numberProducts || 0}
          icon={<BsBox />}
          link="/admin/products"
        />
        <DashboardCard
          title="Categories"
          value={numberCategories || 0}
          icon={<BsTags />}
          link="/admin/categories"
        />
      </Row>

      <Row>
        <DashboardCard
          title="Publishers"
          value={numberPublishers || 0}
          icon={<BsBuilding />}
          link="/admin/publishers"
        />
        <DashboardCard
          title="Orders"
          value={numberOrders || 0}
          icon={<BsClipboardData />}
          link="/admin/orders"
        />
        <DashboardCard
          title="Feedbacks"
          value={numberFeedbacks || 0}
          icon={<BsChatDots />}
          link="/admin/feedbacks"
        />
      </Row>

      <Row>
        <DashboardCard
          title="Manufactures"
          value={numberManufactures || 0}
          icon={<Truck />}
          link="/admin/manufactures"
        />
        <DashboardCard
          title="Coupons"
          value={numberCoupons || 0}
          icon={<Receipt />}
          link="/admin/coupons"
        />
        <DashboardCard
          title="Total Sale"
          value={formatCurrencyVND(totalSale || 0)}
          icon={<CalculatorFill />}
          link="/admin/orders"
        />
      </Row>

      <Row className="mt-3">
        <Col lg={6} className="bg-white">
          <div className="order-management-table">
            <div className="p-2 ">
              <h5>
                <Grid className="me-2 mb-1" />
                RECENT ORDERS
              </h5>
              <hr />
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Order Status</th>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-bold">{order.id}</td>
                      <td>{formatDateWithAmPm(order.orderDate)}</td>
                      <td>{formatCurrencyVND(order.totalAmount)}</td>
                      <td className={getOrderStatusClass(order.orderStatus)}>
                        {order.orderStatus}
                      </td>
                      <td>{order?.userAddress?.fullName || 'N/A'}</td>
                      <td>{order?.userAddress?.phone || 'N/A'}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleShowOrderDetails(order.id)}
                        >
                          Show
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No recent orders available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {selectedOrder && (
              <OrderDetailsModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                selectedOrder={selectedOrder}
                newStatus={newStatus}
                handleStatusChange={handleStatusChange}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </Col>

        <Col lg={6} className="bg-white">
          <div className="ranking-most-popular-products-table">
            <div className="p-2">
              <h5>
                <StarFill className="me-2 mb-1" />
                RANKING OF THE MOST POPULAR PRODUCTS
              </h5>
              <hr />
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Title</th>
                  <th>Sold Items</th>
                  <th>Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product?.product?.id || Math.random()}>
                      <td className="fw-bold">{product?.product?.id || 'N/A'}</td>
                      <td>{product?.product?.title || 'N/A'}</td>
                      <td>{product?.product?.soldItems || 0}</td>
                      <td>{product?.totalQuantity || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No popular products data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Row>
    </>
  );
};

export default DashboardAdmin;
