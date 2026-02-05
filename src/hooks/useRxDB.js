// src/hooks/useRxDB.js
import { useEffect, useState } from 'react';
import { databaseService } from '../database/databaseService';
import { map } from 'rxjs/operators';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await databaseService.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError(err.message);
      }
    };

    init();
  }, []);

  return { isInitialized, error };
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const subscription = databaseService.getProducts$().subscribe({
      next: (data) => {
        setProducts(data);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      }
    });

    // Initial fetch
    databaseService.getAllProducts().catch(err => {
      setError(err.message);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const addProduct = async (productData) => {
    try {
      return await databaseService.addProduct(productData);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduct = async (id, updateData) => {
    try {
      return await databaseService.updateProduct(id, updateData);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      return await databaseService.deleteProduct(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct
  };
};

export const useQuotations = (statusFilter = null) => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let subscription;

    if (statusFilter) {
      subscription = databaseService.getQuotationsByStatus$(statusFilter).subscribe({
        next: (data) => {
          setQuotations(data);
          setLoading(false);
        },
        error: (err) => {
          setError(err.message);
          setLoading(false);
        }
      });
    } else {
      subscription = databaseService.getQuotations$().subscribe({
        next: (data) => {
          setQuotations(data);
          setLoading(false);
        },
        error: (err) => {
          setError(err.message);
          setLoading(false);
        }
      });
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [statusFilter]);

  const createQuotation = async (quotationData) => {
    try {
      return await databaseService.createQuotation(quotationData);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateQuotationStatus = async (id, status) => {
    try {
      return await databaseService.updateQuotationStatus(id, status);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteQuotation = async (id) => {
    try {
      return await databaseService.deleteQuotation(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getQuotation = async (id) => {
    try {
      return await databaseService.getQuotation(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    quotations,
    loading,
    error,
    createQuotation,
    updateQuotationStatus,
    deleteQuotation,
    getQuotation
  };
};

export const useQuotationStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await databaseService.getQuotationStats();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadStats();

    // Subscribe to quotations changes to update stats
    const subscription = databaseService.getQuotations$().subscribe({
      next: async () => {
        const data = await databaseService.getQuotationStats();
        setStats(data);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { stats, loading, error };
};