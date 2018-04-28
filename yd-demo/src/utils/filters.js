// 日期格式过滤器
export const toDate = (val,struct) =>moment(val).format(struct);