import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../features/loading/loadingSlice";

/**
 * Custom hook for managing loading states
 * @returns {Object} Loading utilities
 */
const useLoading = () => {
  const dispatch = useDispatch();

  /**
   * Execute an async function with loading state
   * @param {Function} asyncFunction - The async function to execute
   * @param {String} message - Optional loading message
   * @returns {Promise} Result of the async function
   */
  const withLoading = async (asyncFunction, message = null) => {
    try {
      dispatch(startLoading({ message }));
      const result = await asyncFunction();
      return result;
    } catch (error) {
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  };

  /**
   * Manually start loading
   * @param {String} message - Optional loading message
   */
  const showLoading = (message = null) => {
    dispatch(startLoading({ message }));
  };

  /**
   * Manually stop loading
   */
  const hideLoading = () => {
    dispatch(stopLoading());
  };

  return {
    withLoading,
    showLoading,
    hideLoading,
  };
};

export default useLoading;
