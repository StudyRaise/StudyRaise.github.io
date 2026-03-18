<template>
	<div>
		<!--分页组件-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="pageTotal.total"
		 :page-sizes="[10, 15, 20, 30, 50]" :current-page="pageTotal.currentpage" :page-size="pageTotal.pageSize" :layout="pageTotal.layout">
		</el-pagination>
		<!-- {{pageTotal}} -->
	</div>
</template>
<script>
	export default {
		name: 'paginationCpn',
		props: {
			pageTotal: Object,
			requery: true
		},
		data() {
			return {

			};
		},
		methods: {
			//更换总条数
			handleSizeChange(val) {
				this.$emit("handleSizeChange", val)
			},
			//切换页数
			handleCurrentChange(val) {
				this.$emit("handleCurrentChange", val)
			}
		},

	}
</script>
<style scoped>
	/deep/ .el-input__icon {
		line-height: 0px !important;
	}
	/deep/ .el-input__inner {
    line-height: 0px !important;
}
</style>
