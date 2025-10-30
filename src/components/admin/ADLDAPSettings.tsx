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
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-cyan-400">Cấu hình kết nối AD/LDAP</h2>
          <p className="text-sm text-gray-500 mt-1">
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
      <Card className="bg-[#0f1419] border-gray-800 p-6">
        <h3 className="text-cyan-400 mb-4">Loại kết nối</h3>
        <RadioGroup value={connectionType} onValueChange={setConnectionType}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ad" id="ad" className="border-gray-600 text-cyan-500" />
              <Label htmlFor="ad" className="text-gray-300 cursor-pointer">
                Active Directory (AD)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ldap" id="ldap" className="border-gray-600 text-cyan-500" />
              <Label htmlFor="ldap" className="text-gray-300 cursor-pointer">
                LDAP
              </Label>
            </div>
          </div>
        </RadioGroup>
      </Card>

      {/* Connection Configuration */}
      <Card className="bg-[#0f1419] border-gray-800 p-6">
        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="bg-[#0a0e1a] border border-gray-800">
            <TabsTrigger value="connection" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 text-gray-300">
              Thông tin kết nối
            </TabsTrigger>
            <TabsTrigger value="authentication" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 text-gray-300">
              Xác thực
            </TabsTrigger>
            <TabsTrigger value="mapping" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 text-gray-300">
              Ánh xạ thuộc tính
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connection" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-300">Địa chỉ Server *</Label>
                <Input 
                  placeholder={connectionType === 'ad' ? 'dc.company.com' : 'ldap.company.com'}
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Cổng (Port) *</Label>
                <Input 
                  placeholder={useSSL ? '636' : '389'}
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Base DN *</Label>
              <Input 
                placeholder="DC=company,DC=com"
                className="bg-[#0a0e1a] border-gray-700 text-gray-300"
              />
              <p className="text-xs text-gray-500">Distinguished Name gốc để tìm kiếm người dùng</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#0a0e1a] rounded border border-gray-800">
              <div>
                <Label className="text-gray-300">Sử dụng SSL/TLS</Label>
                <p className="text-xs text-gray-500 mt-1">Kết nối bảo mật qua SSL/TLS</p>
              </div>
              <Switch 
                checked={useSSL}
                onCheckedChange={setUseSSL}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>

            {connectionType === 'ad' && (
              <div className="space-y-2">
                <Label className="text-gray-300">Domain</Label>
                <Input 
                  placeholder="COMPANY"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="authentication" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label className="text-gray-300">Bind DN *</Label>
              <Input 
                placeholder="CN=admin,DC=company,DC=com"
                className="bg-[#0a0e1a] border-gray-700 text-gray-300"
              />
              <p className="text-xs text-gray-500">Tài khoản để xác thực với {connectionType === 'ad' ? 'AD' : 'LDAP'} server</p>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Mật khẩu *</Label>
              <Input 
                type="password"
                placeholder="••••••••"
                className="bg-[#0a0e1a] border-gray-700 text-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">User Search Filter</Label>
              <Input 
                placeholder={connectionType === 'ad' ? '(&(objectClass=user)(sAMAccountName={username}))' : '(&(objectClass=inetOrgPerson)(uid={username}))'}
                className="bg-[#0a0e1a] border-gray-700 text-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Group Search Filter</Label>
              <Input 
                placeholder={connectionType === 'ad' ? '(objectClass=group)' : '(objectClass=groupOfNames)'}
                className="bg-[#0a0e1a] border-gray-700 text-gray-300"
              />
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-4 mt-6">
            <div className="text-sm text-gray-400 mb-4">
              Ánh xạ các thuộc tính từ {connectionType === 'ad' ? 'AD' : 'LDAP'} sang hệ thống
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-300">Username Attribute</Label>
                <Input 
                  placeholder={connectionType === 'ad' ? 'sAMAccountName' : 'uid'}
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Email Attribute</Label>
                <Input 
                  placeholder="mail"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-300">First Name Attribute</Label>
                <Input 
                  placeholder="givenName"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Last Name Attribute</Label>
                <Input 
                  placeholder="sn"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-300">Display Name Attribute</Label>
                <Input 
                  placeholder="displayName"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Member Attribute</Label>
                <Input 
                  placeholder={connectionType === 'ad' ? 'member' : 'memberOf'}
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Connection Status */}
      <Card className="bg-[#0f1419] border-gray-800 p-6">
        <h3 className="text-cyan-400 mb-4">Trạng thái kết nối</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Trạng thái:</span>
            <span className="text-yellow-500">Chưa kết nối</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lần kiểm tra cuối:</span>
            <span className="text-gray-300">-</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Số người dùng đồng bộ:</span>
            <span className="text-gray-300">-</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
