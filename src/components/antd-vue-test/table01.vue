<template>
  <a-table :columns="columns" :data-source="data" :footer="handleFooter" />
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    width: '25%'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: '25%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '25%'
  },
];

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i+1,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
    };
  },
  methods: {
    handleFooter () {
      // 处理 width 成百分比, 默认 'auto' 会根据text 计算宽度，造成footer对不齐的情况
      const columns = this.columns
      columns.forEach(col => {
        col.width = (100 / columns.length) + '%'
      })
      return (
        <a-table
          rowKey={Math.random}
          bordered={false}
          pagination={false}
          columns={columns}
          dataSource={this.footerDataSource || []}
          showHeader={false}
        ></a-table>
      )
    }
  },
  computed: {
    footerDataSource () {
      const summary = Object.assign({}, this.data[0])
      for (const attr in summary) {
        summary[attr] = '合计'
        break
      }
      return [summary]
    }
  }
};
</script>
<style>
 .ant-table-footer{
   padding: 0 !important;
 }
</style>
