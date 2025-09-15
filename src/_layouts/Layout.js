import { HomeOutlined, UnorderedListOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router";
const { Header, Footer, Sider, Content } = Layout;

const items = [
  {
    label: <NavLink to={"/"}>Home</NavLink>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <NavLink to={"/todos"}>TODO List</NavLink>,
    key: "todoList",
    icon: <UnorderedListOutlined />,
  },
  {
    label: <NavLink to={"/about"}>About</NavLink>,
    key: "about",
    icon: <InfoCircleOutlined />,
  },
];

export function DefaultLayer() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Outlet></Outlet>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        footer @copyright
      </Footer>
    </Layout>
  );
}
