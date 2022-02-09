/*
 * @Author: Archy
 * @Date: 2022-01-30 20:30:41
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-09 21:41:13
 * @FilePath: \arkgen\react\src\pages\project\index.tsx
 * @description: 
 */
import React, { useState, useEffect } from "react";
import { notification, Row, Col } from "antd";
import { getProjectInfo, ProjectInfo } from "../../api/project";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierEstuaryLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import './index.less'
const Project: React.FC = () => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>()

  const handleProjectInfo = async () => {
    const result = await getProjectInfo()
    if (result.success) {
      setProjectInfo(result.data)
    } else {
      notification.error({ message: '获取项目信息出错：' + result.msg })
    }
  }

  useEffect(() => {
    handleProjectInfo()
  }, [])

  const renderHeader = () => {
    if (projectInfo) {
      return (
        <header className='arkgen__header'>
          {projectInfo.hasPkg ?
            <div>
              <span>
                {JSON.parse(projectInfo.pkg).name}
              </span>
              <span className='header__version'>
                version:{JSON.parse(projectInfo.pkg).version}
              </span>
            </div> :
            projectInfo.path
          }
        </header>
      )
    } else {
      return (<header className={`arkgen__header header--no-pkg`}>未获取到项目信息</header>)
    }
  }

  const renderLeft = () => {
    return (
      <div>


    </div>)
  }

  const renderRight = () => {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <SyntaxHighlighter language="javascript" style={atelierEstuaryLight} customStyle={{ height: '100%' }} showLineNumbers wrapLongLines >
          {projectInfo ? projectInfo.pkg : '未获取到pkg'}
        </SyntaxHighlighter>
      </div>
    )
  }
  return (
    <div style={{ height: '100%' }}>
      <Row style={{ height: '100%' }}>
        <Col span={16} style={{ backgroundColor: 'white', border: '1px solid #eaecef' }}>
          {renderHeader()}
          {renderLeft()}
        </Col>
        <Col span={8} style={{ height: '100%', overflow: 'auto' }}>{renderRight()}</Col>
      </Row>
    </div >
  )
}
export default Project
