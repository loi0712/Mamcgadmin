import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { useState } from 'react';
import { Save, TestTube } from 'lucide-react';

export function ADLDAPSettings() {
  const [connectionType, setConnectionType] = useState('ad');
  const [useSSL, setUseSSL] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-admin-accent">Cấu hình kết nối AD/LDAP</h2>
          <p className="text-sm text-admin-muted mt-1">
            Cấu hình kết nối với Active Directory hoặc LDAP server
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Kiểm tra kết nối
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
            <Save className="w-4 h-4" />
            Lưu cấu hình
          </Button>
        </div>
      </div>

      {/* Connection Type Selection */}
      <Card className="bg-admin-secondary border-admin p-6">
        <h3 className="text-admin-accent mb-4">Loại kết nối</h3>
        <RadioGroup value={connectionType} onValueChange={setConnectionType}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ad" id="ad" className="border-gray-600 text-cyan-500" />
              <Label htmlFor="ad" className="text-admin-primary cursor-pointer">
                Active Directory (AD)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ldap" id="ldap" className="border-gray-600 text-cyan-500" />
              <Label htmlFor="ldap" className="text-admin-primary cursor-pointer">
                LDAP
              </Label>
            </div>
          </div>
        </RadioGroup>
      </Card>

      {/* Connection Configuration */}
      <Card className="bg-admin-secondary border-admin p-6">
        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="bg-admin-input border border-admin">
            <TabsTrigger value="connection" className="data-[state=active]:bg-admin-hover data-[state=active]:text-admin-accent text-admin-primary">
              Thông tin kết nối
            </TabsTrigger>
            <TabsTrigger value="authentication" className="data-[state=active]:bg-admin-hover data-[state=active]:text-admin-accent text-admin-primary">
              Xác thực
            </TabsTrigger>
            <TabsTrigger value="mapping" className="data-[state=active]:bg-admin-hover data-[state=active]:text-admin-accent text-admin-primary">
              Ánh xạ thuộc tính
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connection" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-admin-primary">Địa chỉ Server *</Label>
                <Input 
                  placeholder={connectionType === 'ad' ? 'dc.company.com' : 'ldap.company.com'}
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-admin-primary">Cổng (Port) *</Label>
                <Input 
                  placeholder={useSSL ? '636' : '389'}
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-admin-primary">Base DN *</Label>
              <Input 
                placeholder="DC=company,DC=com"
                className="bg-admin-input border-admin text-admin-primary"
              />
              <p className="text-xs text-admin-muted">Distinguished Name gốc để tìm kiếm người dùng</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-admin-input rounded border border-admin">
              <div>
                <Label className="text-admin-primary">Sử dụng SSL/TLS</Label>
                <p className="text-xs text-admin-muted mt-1">Kết nối bảo mật qua SSL/TLS</p>
              </div>
              <Switch 
                checked={useSSL}
                onCheckedChange={setUseSSL}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>

            {connectionType === 'ad' && (
              <div className="space-y-2">
                <Label className="text-admin-primary">Domain</Label>
                <Input 
                  placeholder="COMPANY"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="authentication" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-admin-primary">Bind DN *</Label>
              <Input 
                placeholder="CN=admin,DC=company,DC=com"
                className="bg-admin-input border-admin text-admin-primary"
              />
              <p className="text-xs text-admin-muted">Tài khoản để xác thực với {connectionType === 'ad' ? 'AD' : 'LDAP'} server</p>
            </div>

            <div className="space-y-2">
              <Label className="text-admin-primary">Mật khẩu *</Label>
              <Input 
                type="password"
                placeholder="••••••••"
                className="bg-admin-input border-admin text-admin-primary"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-admin-primary">User Search Filter</Label>
              <Input 
                placeholder={connectionType === 'ad' ? '(&(objectClass=user)(sAMAccountName={username}))' : '(&(objectClass=inetOrgPerson)(uid={username}))'}
                className="bg-admin-input border-admin text-admin-primary"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-admin-primary">Group Search Filter</Label>
              <Input 
                placeholder={connectionType === 'ad' ? '(objectClass=group)' : '(objectClass=groupOfNames)'}
                className="bg-admin-input border-admin text-admin-primary"
              />
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-4 mt-4">
            <div className="text-sm text-admin-secondary mb-4">
              Ánh xạ các thuộc tính từ {connectionType === 'ad' ? 'AD' : 'LDAP'} sang hệ thống
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-admin-primary">Username Attribute</Label>
                <Input 
                  placeholder={connectionType === 'ad' ? 'sAMAccountName' : 'uid'}
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-admin-primary">Email Attribute</Label>
                <Input 
                  placeholder="mail"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-admin-primary">First Name Attribute</Label>
                <Input 
                  placeholder="givenName"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-admin-primary">Last Name Attribute</Label>
                <Input 
                  placeholder="sn"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-admin-primary">Display Name Attribute</Label>
                <Input 
                  placeholder="displayName"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-admin-primary">Member Attribute</Label>
                <Input 
                  placeholder={connectionType === 'ad' ? 'member' : 'memberOf'}
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Connection Status */}
      <Card className="bg-admin-secondary border-admin p-6">
        <h3 className="text-admin-accent mb-4">Trạng thái kết nối</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-admin-secondary">Trạng thái:</span>
            <span className="text-yellow-500">Chưa kết nối</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-secondary">Lần kiểm tra cuối:</span>
            <span className="text-admin-primary">-</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-secondary">Số người dùng đồng bộ:</span>
            <span className="text-admin-primary">-</span>
          </div>
        </div>
      </Card>
    </div>
  );
}