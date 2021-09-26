import {ajax} from './ajax'

// 用户第一次授权
export function firstAuth(userid){
  return ajax({
    url:'/firstauth',
    method:'GET',
    params:{userid}
  })
}

// 更换授权码
export function delAuthCode(userid){
  return ajax({
    url:'/delAuthCode',
    method:'GET',
    params:{userid}
  })
}

// 统计本周的签到时间
export function currentSignTime(){
  return ajax({
    url:'/tswkSignInfo',
    method:'GET'
  })
}

// 上周签到未合格
export function lastWeekFailed(){
  return ajax({
    url:'/lastWeekDownToStandard',
    method:'GET'
  })
}

// 获取我的页面全部信息
export function myAllInfo(userid){
  return ajax({
    url:`/myallinfo/${userid}`,
    method:'GET',
  })
}

// 上传人脸图片
export function uploadFace(userid,file){
  return ajax({
    url:`/uploadFace/${userid}`,
    method:'POST',
    data:file,
    headers:{
      'content-type':'multipart/form-data'
    }
  })
}