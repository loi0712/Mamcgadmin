import { useState, useEffect, useCallback } from 'react';
import { workflowService } from '../services/workflow.service';
import {
  Workflow,
  CreateWorkflowRequest,
  WorkflowExecutionStatus,
  PaginationParams,
} from '../types/api';
import { toast } from 'sonner';

interface UseWorkflowsReturn {
  workflows: Workflow[];
  isLoading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchWorkflows: (params?: PaginationParams) => Promise<void>;
  createWorkflow: (data: CreateWorkflowRequest) => Promise<Workflow>;
  updateWorkflow: (id: string, data: Partial<CreateWorkflowRequest>) => Promise<Workflow>;
  deleteWorkflow: (id: string) => Promise<void>;
  executeWorkflow: (id: string, inputData?: any) => Promise<WorkflowExecutionStatus>;
  cloneWorkflow: (id: string, newName?: string) => Promise<Workflow>;
  searchWorkflows: (query: string) => Promise<void>;
  refreshWorkflows: () => Promise<void>;
}

export function useWorkflows(initialParams?: PaginationParams): UseWorkflowsReturn {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [params, setParams] = useState<PaginationParams>(
    initialParams || { page: 1, limit: 10 }
  );

  // Fetch workflows
  const fetchWorkflows = useCallback(async (newParams?: PaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const queryParams = newParams || params;
      const response = await workflowService.getWorkflows(queryParams);
      
      setWorkflows(response.data);
      setPagination(response.pagination);
      setParams(queryParams);
    } catch (err: any) {
      console.error('Fetch workflows error:', err);
      setError(err);
      toast.error('Không thể tải danh sách workflow');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  // Create workflow
  const createWorkflow = useCallback(async (data: CreateWorkflowRequest): Promise<Workflow> => {
    try {
      setIsLoading(true);
      const newWorkflow = await workflowService.createWorkflow(data);
      
      // Refresh workflows list
      await fetchWorkflows();
      
      toast.success('Tạo workflow thành công!');
      return newWorkflow;
    } catch (err: any) {
      console.error('Create workflow error:', err);
      toast.error(err.response?.data?.message || 'Tạo workflow thất bại');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchWorkflows]);

  // Update workflow
  const updateWorkflow = useCallback(async (
    id: string,
    data: Partial<CreateWorkflowRequest>
  ): Promise<Workflow> => {
    try {
      setIsLoading(true);
      const updatedWorkflow = await workflowService.updateWorkflow(id, data);
      
      // Update local state
      setWorkflows(prevWorkflows =>
        prevWorkflows.map(workflow =>
          workflow.id === id ? updatedWorkflow : workflow
        )
      );
      
      toast.success('Cập nhật workflow thành công!');
      return updatedWorkflow;
    } catch (err: any) {
      console.error('Update workflow error:', err);
      toast.error(err.response?.data?.message || 'Cập nhật workflow thất bại');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete workflow
  const deleteWorkflow = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      await workflowService.deleteWorkflow(id);
      
      // Remove from local state
      setWorkflows(prevWorkflows =>
        prevWorkflows.filter(workflow => workflow.id !== id)
      );
      
      toast.success('Xóa workflow thành công!');
    } catch (err: any) {
      console.error('Delete workflow error:', err);
      toast.error(err.response?.data?.message || 'Xóa workflow thất bại');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Execute workflow
  const executeWorkflow = useCallback(async (
    id: string,
    inputData?: any
  ): Promise<WorkflowExecutionStatus> => {
    try {
      setIsLoading(true);
      const execution = await workflowService.executeWorkflow(id, inputData);
      
      toast.success('Workflow đang chạy...');
      return execution;
    } catch (err: any) {
      console.error('Execute workflow error:', err);
      toast.error(err.response?.data?.message || 'Không thể chạy workflow');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clone workflow
  const cloneWorkflow = useCallback(async (
    id: string,
    newName?: string
  ): Promise<Workflow> => {
    try {
      setIsLoading(true);
      const clonedWorkflow = await workflowService.cloneWorkflow(id, newName);
      
      // Refresh workflows list
      await fetchWorkflows();
      
      toast.success('Nhân bản workflow thành công!');
      return clonedWorkflow;
    } catch (err: any) {
      console.error('Clone workflow error:', err);
      toast.error(err.response?.data?.message || 'Nhân bản workflow thất bại');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchWorkflows]);

  // Search workflows
  const searchWorkflows = useCallback(async (query: string) => {
    await fetchWorkflows({ ...params, search: query, page: 1 });
  }, [params, fetchWorkflows]);

  // Refresh workflows
  const refreshWorkflows = useCallback(async () => {
    await fetchWorkflows(params);
  }, [params, fetchWorkflows]);

  // Initial fetch
  useEffect(() => {
    fetchWorkflows();
  }, []); // Empty deps - only fetch once on mount

  return {
    workflows,
    isLoading,
    error,
    pagination,
    fetchWorkflows,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    executeWorkflow,
    cloneWorkflow,
    searchWorkflows,
    refreshWorkflows,
  };
}
