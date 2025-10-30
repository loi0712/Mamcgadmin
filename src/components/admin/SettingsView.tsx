import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ADLDAPSettings } from './ADLDAPSettings';
import { CGServerSettings } from './CGServerSettings';
import { EmailSettings } from './EmailSettings';

export function SettingsView() {
  return (
    <div>
      <Tabs defaultValue="ad-ldap" className="w-full">
        <TabsList className="bg-[#0f1419] border-b border-gray-800 w-full justify-start rounded-none h-auto p-0">
          <TabsTrigger 
            value="ad-ldap" 
            className="data-[state=active]:bg-transparent data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 rounded-none px-6 py-3 text-gray-300 hover:text-gray-100"
          >
            Kết nối AD/LDAP
          </TabsTrigger>
          <TabsTrigger 
            value="cg-server" 
            className="data-[state=active]:bg-transparent data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 rounded-none px-6 py-3 text-gray-300 hover:text-gray-100"
          >
            Kết nối Server CG
          </TabsTrigger>
          <TabsTrigger 
            value="email" 
            className="data-[state=active]:bg-transparent data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 rounded-none px-6 py-3 text-gray-300 hover:text-gray-100"
          >
            Cấu hình Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ad-ldap" className="mt-6">
          <ADLDAPSettings />
        </TabsContent>

        <TabsContent value="cg-server" className="mt-6">
          <CGServerSettings />
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <EmailSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}