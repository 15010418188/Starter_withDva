const converId = (title) => {
  return "暂无";
}

const converServer = (title , type) => {
  return "暂无";
}

const conver = (list) => {
  var install = _.map(list, item => { return converServer(item,'install') })
  var active = _.map(list, item => { return converServer(item,'active') })
  return _.concat(install , active );
}

const reportCommon = {
  converId,
  converServer,
  conver
}
export default reportCommon;
