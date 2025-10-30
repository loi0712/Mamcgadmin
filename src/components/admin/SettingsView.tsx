import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ADLDAPSettings } from './ADLDAPSettings';
import { CGServerSettings } from './CGServerSettings';
import { EmailSettings } from './EmailSettings';

export function SettingsView() {
  return (
    <div>
      <Tabs defaultValue="ad-ldap" className="w-full">
        <TabsList className="bg-admin-secondary border-b border-admin w-full justify-start rounded-none h-auto p-0">
          <TabsTrigger 
            value="ad-ldap" 
            className="data-[state=active]:bg-transparent data-[state=active]:text-admin-accent data-[state=active]:border-b-2 data-[state=active]:border-admin-accent rounded-none px-6 py-3 text-admin-secondary hover:text-admin-primary"
          >
            Kết nối AD/LDAP
          </TabsTrigger>
          <TabsTrigger 
            value="cg-server" 
            className="data-[state=active]:bg-transparent data-[state=active]:text-admin-accent data-[state=active]:border-b-2 data-[state=active]:border-admin-accent rounded-none px-6 py-3 text-admin-secondary hover:text-admin-primary"
          >
            Kết nối Server CG
          </TabsTrigger>
          <TabsTrigger 
            value="email" 
            className="data-[state=active]:bg-transparent data-[state=active]:text-admin-accent data-[state=active]:border-b-2 data-[state=active]:border-admin-accent rounded-none px-6 py-3 text-admin-secondary hover:text-admin-primary"
          >
            Cấu hình Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ad-ldap" className="mt-4">
          <ADLDAPSettings />
        </TabsContent>

        <TabsContent value="cg-server" className="mt-4">
          <CGServerSettings />
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <EmailSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
