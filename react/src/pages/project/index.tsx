/*
 * @Author: Archy
 * @Date: 2022-01-30 20:30:41
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 22:29:17
 * @FilePath: \arkgen\react\src\pages\project\index.tsx
 * @description: 
 */
import React, { useState,useEffect } from "react";
import { getProjectInfo } from "../../api/project";
const Project: React.FC = () => {
  const [projectInfo, setProjectInfo] = useState({})
  getProjectInfo().then((res: any) => {
    // if (res.success) {
    //   setProjectInfo(res.data)
    // } else {

    // }
  })
  const renderLeft = () => {
    return (<div>left</div>)
  }

  const renderRight = () => {
    return (<div>right</div>)
  }
  return (
    <div>
      {renderLeft()}
      {renderRight()}
    </div>
  )
}
export default Project
