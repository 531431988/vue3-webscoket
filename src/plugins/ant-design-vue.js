import { Button, Checkbox, Form, Input } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item
const components = [
  Form, FormItem,
  Input, 
  Checkbox,
  CheckboxGroup,
  Button
]

const ant = {
  install(Vue) {
    components.map(component => {
      Vue.use(component)
    })
  },
};

export default ant;
