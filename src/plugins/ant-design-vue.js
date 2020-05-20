import Vue from 'vue'
import {
  Row,
  Col,
  Input,
  Button,
  Dropdown,
  Tree,
  DatePicker,
  Card,
  Menu,
  Table,
  Tabs,
  Divider,
  Icon,
  Badge,
  Avatar,
  Carousel,
  Modal,
  Empty,
  message,
  notification,
  ConfigProvider
} from 'ant-design-vue'

const { Meta } = Card
const { TabPane } = Tabs
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const MenuDivider = Menu.Divider
const MenuItemGroup = Menu.ItemGroup

const components = [
  Row,
  Col,
  Input,
  Button,
  Dropdown,
  Tree,
  DatePicker,
  Meta,
  Card,
  Menu, MenuItem, SubMenu, MenuDivider, MenuItemGroup,
  Table,
  Tabs, TabPane,
  Divider,
  Icon,
  Badge,
  Avatar,
  Carousel,
  Modal,
  Empty,
  ConfigProvider
]
components.map(component => {
  Vue.use(component)
})

Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$destroyAll = Modal.destroyAll
Vue.prototype.$message = message
