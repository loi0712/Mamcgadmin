import { Mail, Send, CheckCircle, AlertCircle, Server, Lock, FileText } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner';

export function EmailSettings() {
  const [testEmailStatus, setTestEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [enableSSL, setEnableSSL] = useState(true);
  const [enableAuth, setEnableAuth] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleTestEmail = async () => {
    setTestEmailStatus('sending');
    try {
      // Simulate sending test email
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestEmailStatus('success');
      toast.success('Email thử nghiệm đã được gửi!', {
        description: 'Vui lòng kiểm tra hộp thư đến'
      });
      setTimeout(() => setTestEmailStatus('idle'), 3000);
    } catch (err) {
      setTestEmailStatus('error');
      toast.error('Không thể gửi email', {
        description: 'Vui lòng kiểm tra lại cấu hình SMTP'
      });
      setTimeout(() => setTestEmailStatus('idle'), 3000);
    }
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Đã lưu cấu hình email', {
        description: 'Các thay đổi đã được áp dụng'
      });
    } catch (err) {
      toast.error('Lỗi khi lưu cấu hình');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    toast.info('Đã khôi phục cấu hình mặc định');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="smtp" className="w-full">
        <TabsList className="bg-admin-secondary border border-admin">
          <TabsTrigger 
            value="smtp" 
            className="data-[state=active]:bg-admin-tertiary data-[state=active]:text-admin-accent text-admin-secondary"
          >
            <Server className="w-4 h-4 mr-2" />
            Cấu hình SMTP
          </TabsTrigger>
          <TabsTrigger 
            value="templates" 
            className="data-[state=active]:bg-admin-tertiary data-[state=active]:text-admin-accent text-admin-secondary"
          >
            <FileText className="w-4 h-4 mr-2" />
            Mẫu Email
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-admin-tertiary data-[state=active]:text-admin-accent text-admin-secondary"
          >
            <Mail className="w-4 h-4 mr-2" />
            Thông báo
          </TabsTrigger>
        </TabsList>

        {/* SMTP Configuration Tab */}
        <TabsContent value="smtp" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left: SMTP Server Settings */}
            <Card className="bg-admin-secondary border-admin p-6">
              <h3 className="text-admin-accent mb-4 flex items-center gap-2">
                <Server className="w-5 h-5" />
                Máy chủ SMTP
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-admin-primary">SMTP Host *</Label>
                  <Input 
                    placeholder="smtp.gmail.com"
                    defaultValue="smtp.mamcg.vn"
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                  <p className="text-xs text-admin-muted">Địa chỉ máy chủ SMTP</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-admin-primary">Cổng (Port) *</Label>
                    <Input 
                      type="number"
                      placeholder="587"
                      defaultValue="587"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-admin-primary">Mã hóa</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger className="bg-admin-input border-admin text-admin-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-admin-secondary border-admin">
                        <SelectItem value="none" className="text-admin-primary">Không mã hóa</SelectItem>
                        <SelectItem value="ssl" className="text-admin-primary">SSL (Port 465)</SelectItem>
                        <SelectItem value="tls" className="text-admin-primary">TLS/STARTTLS (Port 587)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 pb-2 border-t border-admin">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-admin-accent" />
                    <Label className="text-admin-primary">Sử dụng SSL/TLS</Label>
                  </div>
                  <Switch 
                    checked={enableSSL}
                    onCheckedChange={setEnableSSL}
                    className="data-[state=checked]:bg-admin-accent" 
                  />
                </div>

                <div className="flex items-center justify-between pb-2">
                  <Label className="text-admin-primary">Yêu cầu xác thực</Label>
                  <Switch 
                    checked={enableAuth}
                    onCheckedChange={setEnableAuth}
                    className="data-[state=checked]:bg-admin-accent" 
                  />
                </div>

                {enableAuth && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-admin-primary">Tên đăng nhập *</Label>
                      <Input 
                        placeholder="user@example.com"
                        defaultValue="notification@mamcg.vn"
                        className="bg-admin-input border-admin text-admin-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-admin-primary">Mật khẩu *</Label>
                      <Input 
                        type="password"
                        placeholder="••••••••••••"
                        className="bg-admin-input border-admin text-admin-primary"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label className="text-admin-primary">Timeout (giây)</Label>
                  <Input 
                    type="number"
                    placeholder="30"
                    defaultValue="30"
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                </div>
              </div>
            </Card>

            {/* Right: Email Settings & Test */}
            <div className="space-y-6">
              <Card className="bg-admin-secondary border-admin p-6">
                <h3 className="text-admin-accent mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Thông tin người gửi
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-admin-primary">Tên người gửi *</Label>
                    <Input 
                      placeholder="MAMCG System"
                      defaultValue="MAMCG Notification"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-admin-primary">Email người gửi *</Label>
                    <Input 
                      type="email"
                      placeholder="noreply@mamcg.vn"
                      defaultValue="notification@mamcg.vn"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-admin-primary">Email trả lời (Reply-To)</Label>
                    <Input 
                      type="email"
                      placeholder="support@mamcg.vn"
                      defaultValue="support@mamcg.vn"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-admin-primary">Email CC (tùy chọn)</Label>
                    <Input 
                      type="email"
                      placeholder="admin@mamcg.vn"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                    <p className="text-xs text-admin-muted">Nhận bản sao tất cả email</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-admin-secondary border-admin p-6">
                <h3 className="text-admin-accent mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Kiểm tra kết nối
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-admin-primary">Email nhận thử nghiệm</Label>
                    <Input 
                      type="email"
                      placeholder="test@example.com"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>

                  <Button 
                    onClick={handleTestEmail}
                    disabled={testEmailStatus === 'sending'}
                    className="w-full bg-admin-accent hover:bg-admin-accent-hover text-white"
                  >
                    {testEmailStatus === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang gửi...
                      </>
                    ) : testEmailStatus === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Gửi thành công!
                      </>
                    ) : testEmailStatus === 'error' ? (
                      <>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Gửi thất bại
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Gửi email thử nghiệm
                      </>
                    )}
                  </Button>

                  {testEmailStatus === 'success' && (
                    <div className="bg-green-900/20 border border-green-500 rounded p-3 text-sm text-admin-success">
                      Email đã được gửi thành công. Vui lòng kiểm tra hộp thư đến.
                    </div>
                  )}

                  {testEmailStatus === 'error' && (
                    <div className="bg-red-900/20 border border-red-500 rounded p-3 text-sm text-admin-error">
                      Không thể gửi email. Vui lòng kiểm tra lại cấu hình SMTP.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-admin">
            <Button 
              variant="outline" 
              className="border-admin text-admin-secondary hover:bg-admin-hover"
              onClick={handleReset}
            >
              Khôi phục mặc định
            </Button>
            <Button 
              className="bg-admin-accent hover:bg-admin-accent-hover text-white"
              onClick={handleSaveConfig}
              disabled={isSaving}
            >
              {isSaving ? 'Đang lưu...' : 'Lưu cấu hình'}
            </Button>
          </div>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="templates" className="space-y-6 mt-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'backup-success', name: 'Backup thành công', desc: 'Thông báo backup database thành công' },
              { id: 'backup-failed', name: 'Backup thất bại', desc: 'Cảnh báo khi backup thất bại' },
              { id: 'user-created', name: 'Tài khoản mới', desc: 'Thông báo tạo tài khoản mới' },
              { id: 'password-reset', name: 'Đặt lại mật khẩu', desc: 'Email đặt lại mật khẩu' },
              { id: 'system-alert', name: 'Cảnh báo hệ thống', desc: 'Thông báo lỗi hệ thống' },
              { id: 'workflow-complete', name: 'Workflow hoàn tất', desc: 'Thông báo workflow hoàn tất' },
            ].map((template) => (
              <Card 
                key={template.id} 
                className="bg-admin-secondary border-admin p-4 hover:border-admin-accent transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <FileText className="w-5 h-5 text-admin-accent" />
                  <Badge variant="outline" className="border-admin-success text-admin-success text-xs">
                    Hoạt động
                  </Badge>
                </div>
                <h4 className="text-admin-primary mb-1">{template.name}</h4>
                <p className="text-xs text-admin-muted mb-3">{template.desc}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-admin text-admin-secondary hover:bg-admin-hover"
                >
                  Chỉnh sửa
                </Button>
              </Card>
            ))}
          </div>

          {/* Template Editor Preview */}
          <Card className="bg-admin-secondary border-admin p-6">
            <h3 className="text-admin-accent mb-4">Chỉnh sửa mẫu email</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-admin-primary">Tiêu đề email *</Label>
                  <Input 
                    placeholder="Tiêu đề email"
                    defaultValue="[MAMCG] Backup database thành công"
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-admin-primary">Nội dung email *</Label>
                  <Textarea 
                    placeholder="Nội dung email (hỗ trợ HTML)"
                    defaultValue={`Xin chào {{user_name}},

Hệ thống đã thực hiện backup database thành công.

Thông tin:
- Database: {{database_name}}
- Thời gian: {{backup_time}}
- Kích thước: {{backup_size}}
- Vị trí: {{backup_path}}

Trân trọng,
MAMCG System`}
                    className="bg-admin-input border-admin text-admin-primary min-h-[300px] font-mono text-sm"
                  />
                  <p className="text-xs text-admin-muted">
                    Biến khả dụng: {'{{'} user_name {'}},'} {'{{'} database_name {'}},'} {'{{'} backup_time {'}},'} {'{{'} backup_size {'}}'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-admin-primary">Xem trước</Label>
                <div className="bg-white text-gray-900 rounded p-6 border">
                  <div className="border-b pb-4 mb-4">
                    <div className="text-sm text-gray-500 mb-1">Từ: MAMCG Notification &lt;notification&#64;mamcg.vn&gt;</div>
                    <div className="text-sm text-gray-500 mb-2">Đến: admin&#64;mamcg.vn</div>
                    <div className="text-lg">[MAMCG] Backup database thành công</div>
                  </div>
                  <div className="text-sm whitespace-pre-wrap">
                    Xin chào Admin,<br/><br/>
                    Hệ thống đã thực hiện backup database thành công.<br/><br/>
                    Thông tin:<br/>
                    - Database: main_db<br/>
                    - Thời gian: 30/10/2025 02:00:00<br/>
                    - Kích thước: 2.4 GB<br/>
                    - Vị trí: /var/backups/database<br/><br/>
                    Trân trọng,<br/>
                    MAMCG System
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-admin mt-4">
              <Button 
                variant="outline" 
                className="border-admin text-admin-secondary hover:bg-admin-hover"
              >
                Hủy
              </Button>
              <Button className="bg-admin-accent hover:bg-admin-accent-hover text-white">
                Lưu mẫu
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Settings Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Notification Types */}
            <Card className="bg-admin-secondary border-admin p-6">
              <h3 className="text-admin-accent mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Loại thông báo
              </h3>

              <ScrollArea className="h-[500px]">
                <div className="space-y-3 pr-4">
                  {[
                    { category: 'Hệ thống', items: [
                      { id: 'system-start', name: 'Khởi động hệ thống', enabled: true },
                      { id: 'system-shutdown', name: 'Tắt hệ thống', enabled: true },
                      { id: 'system-error', name: 'Lỗi hệ thống', enabled: true },
                      { id: 'system-warning', name: 'Cảnh báo hệ thống', enabled: true },
                    ]},
                    { category: 'Database', items: [
                      { id: 'db-backup-success', name: 'Backup thành công', enabled: true },
                      { id: 'db-backup-failed', name: 'Backup thất bại', enabled: true },
                      { id: 'db-connection-lost', name: 'Mất kết nối database', enabled: true },
                      { id: 'db-connection-restored', name: 'Khôi phục kết nối', enabled: false },
                    ]},
                    { category: 'Người dùng', items: [
                      { id: 'user-created', name: 'Tạo tài khoản mới', enabled: true },
                      { id: 'user-deleted', name: 'Xóa tài khoản', enabled: true },
                      { id: 'user-login-failed', name: 'Đăng nhập thất bại', enabled: true },
                      { id: 'user-password-changed', name: 'Đổi mật khẩu', enabled: false },
                    ]},
                    { category: 'Workflow', items: [
                      { id: 'workflow-completed', name: 'Workflow hoàn tất', enabled: true },
                      { id: 'workflow-failed', name: 'Workflow thất bại', enabled: true },
                      { id: 'workflow-started', name: 'Workflow bắt đầu', enabled: false },
                    ]},
                    { category: 'Lưu trữ', items: [
                      { id: 'storage-full', name: 'Dung lượng đầy', enabled: true },
                      { id: 'storage-warning', name: 'Cảnh báo dung lượng (80%)', enabled: true },
                      { id: 'storage-cleanup', name: 'Dọn dẹp lưu trữ', enabled: false },
                    ]},
                  ].map((category) => (
                    <div key={category.category}>
                      <div className="text-sm text-admin-accent mb-2 mt-3">{category.category}</div>
                      {category.items.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between py-2 px-3 bg-admin-input border border-admin rounded mb-2 hover:bg-admin-hover"
                        >
                          <Label className="text-admin-primary text-sm cursor-pointer">
                            {item.name}
                          </Label>
                          <Switch 
                            defaultChecked={item.enabled}
                            className="data-[state=checked]:bg-admin-accent" 
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Notification Recipients */}
            <div className="space-y-6">
              <Card className="bg-admin-secondary border-admin p-6">
                <h3 className="text-admin-accent mb-4">Người nhận mặc định</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-admin-primary">Email quản trị viên</Label>
                    <Input 
                      type="email"
                      placeholder="admin@mamcg.vn"
                      defaultValue="admin@mamcg.vn"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-admin-primary">Email kỹ thuật</Label>
                    <Input 
                      type="email"
                      placeholder="tech@mamcg.vn"
                      defaultValue="tech@mamcg.vn"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-admin-primary">Email bảo mật</Label>
                    <Input 
                      type="email"
                      placeholder="security@mamcg.vn"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-admin-primary">Danh sách email CC (phân cách bởi dấu phẩy)</Label>
                    <Textarea 
                      placeholder="user1@mamcg.vn, user2@mamcg.vn"
                      className="bg-admin-input border-admin text-admin-primary"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              <Card className="bg-admin-secondary border-admin p-6">
                <h3 className="text-admin-accent mb-4">Tùy chọn nâng cao</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-admin-primary">Gộp thông báo cùng loại</Label>
                    <Switch className="data-[state=checked]:bg-admin-accent" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-admin-primary">Thời gian chờ giữa các email (phút)</Label>
                    <Input 
                      type="number"
                      placeholder="5"
                      defaultValue="5"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                    <p className="text-xs text-admin-muted">Tránh spam khi có nhiều thông báo liên tiếp</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-admin-primary">Mức độ ưu tiên tối thiểu</Label>
                    <Select defaultValue="warning">
                      <SelectTrigger className="bg-admin-input border-admin text-admin-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-admin-secondary border-admin">
                        <SelectItem value="info" className="text-admin-primary">Thông tin</SelectItem>
                        <SelectItem value="warning" className="text-admin-primary">Cảnh báo</SelectItem>
                        <SelectItem value="error" className="text-admin-primary">Lỗi</SelectItem>
                        <SelectItem value="critical" className="text-admin-primary">Nghiêm trọng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-admin-primary">Gửi email vào giờ hành chính</Label>
                    <Switch className="data-[state=checked]:bg-admin-accent" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-admin-primary text-sm">Từ</Label>
                      <Input 
                        type="time"
                        defaultValue="08:00"
                        className="bg-admin-input border-admin text-admin-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-admin-primary text-sm">Đến</Label>
                      <Input 
                        type="time"
                        defaultValue="18:00"
                        className="bg-admin-input border-admin text-admin-primary"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-admin">
            <Button 
              variant="outline" 
              className="border-admin text-admin-secondary hover:bg-admin-hover"
              onClick={handleReset}
            >
              Khôi phục mặc định
            </Button>
            <Button 
              className="bg-admin-accent hover:bg-admin-accent-hover text-white"
              onClick={handleSaveConfig}
              disabled={isSaving}
            >
              {isSaving ? 'Đang lưu...' : 'Lưu cấu hình'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}