import { api } from '../lib/api/client';
import { API_ENDPOINTS, buildPaginationQuery, PaginationParams } from '../lib/api/endpoints';
import {
  ApiResponse,
  PaginatedResponse,
  Workflow,
  CreateWorkflowRequest,
  WorkflowExecutionStatus,
} from '../types/api';

class WorkflowService {
  /**
   * Get list of workflows
   */
  async getWorkflows(params?: PaginationParams): Promise<PaginatedResponse<Workflow>> {
    const queryString = params ? buildPaginationQuery(params) : '';
    const response = await api.get<PaginatedResponse<Workflow>>(
      `${API_ENDPOINTS.WORKFLOWS.LIST}${queryString}`
    );
    return response.data;
  }

  /**
   * Get workflow by ID
   */
  async getWorkflowById(id: string): Promise<Workflow> {
    const response = await api.get<ApiResponse<Workflow>>(
      API_ENDPOINTS.WORKFLOWS.GET(id)
    );
    return response.data.data;
  }

  /**
   * Create new workflow
   */
  async createWorkflow(workflowData: CreateWorkflowRequest): Promise<Workflow> {
    const response = await api.post<ApiResponse<Workflow>>(
      API_ENDPOINTS.WORKFLOWS.CREATE,
      workflowData
    );
    return response.data.data;
  }

  /**
   * Update workflow
   */
  async updateWorkflow(id: string, workflowData: Partial<CreateWorkflowRequest>): Promise<Workflow> {
    const response = await api.put<ApiResponse<Workflow>>(
      API_ENDPOINTS.WORKFLOWS.UPDATE(id),
      workflowData
    );
    return response.data.data;
  }

  /**
   * Delete workflow
   */
  async deleteWorkflow(id: string): Promise<void> {
    await api.delete<ApiResponse>(API_ENDPOINTS.WORKFLOWS.DELETE(id));
  }

  /**
   * Execute workflow
   */
  async executeWorkflow(id: string, inputData?: any): Promise<WorkflowExecutionStatus> {
    const response = await api.post<ApiResponse<WorkflowExecutionStatus>>(
      API_ENDPOINTS.WORKFLOWS.EXECUTE(id),
      { input: inputData }
    );
    return response.data.data;
  }

  /**
   * Get workflow execution status
   */
  async getExecutionStatus(workflowId: string, executionId?: string): Promise<WorkflowExecutionStatus> {
    const endpoint = executionId 
      ? `${API_ENDPOINTS.WORKFLOWS.STATUS(workflowId)}/${executionId}`
      : API_ENDPOINTS.WORKFLOWS.STATUS(workflowId);
      
    const response = await api.get<ApiResponse<WorkflowExecutionStatus>>(endpoint);
    return response.data.data;
  }

  /**
   * Get workflow execution history
   */
  async getExecutionHistory(id: string, params?: PaginationParams): Promise<PaginatedResponse<WorkflowExecutionStatus>> {
    const queryString = params ? buildPaginationQuery(params) : '';
    const response = await api.get<PaginatedResponse<WorkflowExecutionStatus>>(
      `${API_ENDPOINTS.WORKFLOWS.HISTORY(id)}${queryString}`
    );
    return response.data;
  }

  /**
   * Search workflows
   */
  async searchWorkflows(query: string, params?: PaginationParams): Promise<PaginatedResponse<Workflow>> {
    const searchParams = { ...params, search: query };
    return this.getWorkflows(searchParams);
  }

  /**
   * Get workflows by status
   */
  async getWorkflowsByStatus(status: string, params?: PaginationParams): Promise<PaginatedResponse<Workflow>> {
    const queryString = params ? buildPaginationQuery({ ...params }) : '';
    const response = await api.get<PaginatedResponse<Workflow>>(
      `${API_ENDPOINTS.WORKFLOWS.LIST}?status=${status}${queryString}`
    );
    return response.data;
  }

  /**
   * Clone workflow
   */
  async cloneWorkflow(id: string, newName?: string): Promise<Workflow> {
    const workflow = await this.getWorkflowById(id);
    
    const clonedData: CreateWorkflowRequest = {
      name: newName || `${workflow.name} (Copy)`,
      description: workflow.description,
      trigger: workflow.trigger,
      nodes: workflow.nodes,
      connections: workflow.connections,
    };
    
    return this.createWorkflow(clonedData);
  }

  /**
   * Export workflow
   */
  async exportWorkflow(id: string): Promise<Blob> {
    const workflow = await this.getWorkflowById(id);
    const json = JSON.stringify(workflow, null, 2);
    return new Blob([json], { type: 'application/json' });
  }

  /**
   * Import workflow
   */
  async importWorkflow(data: CreateWorkflowRequest): Promise<Workflow> {
    return this.createWorkflow(data);
  }

  /**
   * Bulk delete workflows
   */
  async bulkDeleteWorkflows(ids: string[]): Promise<void> {
    await Promise.all(ids.map(id => this.deleteWorkflow(id)));
  }

  /**
   * Cancel workflow execution
   */
  async cancelExecution(workflowId: string, executionId: string): Promise<void> {
    await api.post<ApiResponse>(
      `${API_ENDPOINTS.WORKFLOWS.STATUS(workflowId)}/${executionId}/cancel`
    );
  }
}

export const workflowService = new WorkflowService();
export default workflowService;
