/**
 * 配置相关 API
 */

import { apiClient } from './client';
import type { Config } from '@/types';
import { normalizeConfigResponse } from './transformers';

export const configApi = {
  /**
   * 获取配置（会进行字段规范化）
   */
  async getConfig(): Promise<Config> {
    const [raw, readOnlyData, syncIntervalData] = await Promise.all([
      apiClient.get('/config'),
      // 单独获取只读设置，失败则忽略（兼容旧版服务端）
      apiClient.get('/storage/readonly').catch(() => ({})),
      // 单独获取同步间隔设置，失败则忽略
      apiClient.get('/storage/sync-interval').catch(() => ({}))
    ]);

    // 合并单独获取的配置到 raw 对象中，以便统一 normalize
    if (raw && typeof raw === 'object') {
      if (readOnlyData && typeof readOnlyData.read_only !== 'undefined') {
        raw['read-only'] = readOnlyData.read_only;
      }
      if (syncIntervalData && typeof syncIntervalData.sync_interval_minutes !== 'undefined') {
        raw['sync-interval-minutes'] = syncIntervalData.sync_interval_minutes;
      }
    }

    return normalizeConfigResponse(raw);
  },

  /**
   * 获取原始配置（不做转换）
   */
  getRawConfig: () => apiClient.get('/config'),

  /**
   * 获取只读模式设置
   */
  getReadOnly: () => apiClient.get('/storage/readonly'),

  /**
   * 获取同步间隔设置
   */
  getSyncInterval: () => apiClient.get('/storage/sync-interval'),

  /**
   * 更新 Debug 模式
   */
  updateDebug: (enabled: boolean) => apiClient.put('/debug', { value: enabled }),

  /**
   * 更新代理 URL
   */
  updateProxyUrl: (proxyUrl: string) => apiClient.put('/proxy-url', { value: proxyUrl }),

  /**
   * 清除代理 URL
   */
  clearProxyUrl: () => apiClient.delete('/proxy-url'),

  /**
   * 更新重试次数
   */
  updateRequestRetry: (retryCount: number) => apiClient.put('/request-retry', { value: retryCount }),

  /**
   * 配额回退：切换项目
   */
  updateSwitchProject: (enabled: boolean) =>
    apiClient.put('/quota-exceeded/switch-project', { value: enabled }),

  /**
   * 配额回退：切换预览模型
   */
  updateSwitchPreviewModel: (enabled: boolean) =>
    apiClient.put('/quota-exceeded/switch-preview-model', { value: enabled }),

  /**
   * 使用统计开关
   */
  updateUsageStatistics: (enabled: boolean) =>
    apiClient.put('/usage-statistics-enabled', { value: enabled }),

  /**
   * 请求日志开关
   */
  updateRequestLog: (enabled: boolean) => apiClient.put('/request-log', { value: enabled }),

  /**
   * 写日志到文件开关
   */
  updateLoggingToFile: (enabled: boolean) => apiClient.put('/logging-to-file', { value: enabled }),

  /**
   * WebSocket 鉴权开关
   */
  updateWsAuth: (enabled: boolean) => apiClient.put('/ws-auth', { value: enabled }),

  /**
   * 存储：只读模式开关
   */
  updateReadOnly: (enabled: boolean) => apiClient.put('/storage/readonly', { value: enabled }),

  /**
   * 存储：同步间隔（分钟）
   */
  updateSyncInterval: (minutes: number) => apiClient.put('/storage/sync-interval', { value: minutes }),
};
