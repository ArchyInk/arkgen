/*
 * @Author: Archy
 * @Date: 2022-01-30 20:30:41
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-11 16:28:17
 * @FilePath: \arkgen\react\src\pages\project\index.tsx
 * @description: 
 */
import React, { useState, useEffect } from "react";
import { notification, Row, Col, Tree, Card } from "antd";
import { getProjectInfo, ProjectInfo } from "../../api/project";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierEstuaryLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const { DirectoryTree } = Tree

import './index.less'
const Project: React.FC = () => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>()
  const [dirs,setDirs] = useState<>()
  const cardHeaderStyle: React.CSSProperties = { display: 'flex', height: '3rem', alignItems: 'center' }
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
            <div className="header__project">
              {JSON.parse(projectInfo.pkg).name}
              <div className="project__info">
                <div >version:{JSON.parse(projectInfo.pkg).version}</div>
                <div >description:{JSON.parse(projectInfo.pkg).description}</div>
              </div>
            </div> :
            projectInfo.path
          }
        </header>
      )
    } else {
      return (<header className={`arkgen__header header--no-pkg`}>未获取到项目信息</header>)
    }
  }

  const renderLeftBody = () => {
    const rowStyle: React.CSSProperties = { padding: 8, height: 'calc(100% - 3rem)', width: '100%' }
    return (
      < Row style={rowStyle} gutter={8}>
        <Col span={16}>
          {renderTaskList()}
          {renderDependenciesList()}
        </Col>
        <Col span={8}>
          {renderDirs()}
        </Col>
      </ Row>)
  }

  const renderDirs = () => {
    const cardStyle: React.CSSProperties = { minHeight: '100%' }
    const onLoadData = () => {

    }
    return (
      <Card title="项目结构" style={cardStyle} headStyle={cardHeaderStyle}>
        <DirectoryTree treeData={projectInfo?.dirs} loadData={onLoadData}></DirectoryTree>
      </Card>
    )
  }

  const renderTaskList = () => {
    const bodyStyle: React.CSSProperties = { marginBottom: '8px' }
    return (
      <Card title="任务列表" style={bodyStyle} headStyle={cardHeaderStyle}>

      </Card>
    )
  }
  const renderDependenciesList = () => {
    return (
      <Card title="依赖列表" headStyle={cardHeaderStyle}>

      </Card>
    )
  }


  const renderLeft = () => {
    return (
      <>
        {renderHeader()}
        {renderLeftBody()}
      </>)
  }

  const renderRight = () => {
    const divStyle: React.CSSProperties = { height: '100%', width: '100%' }
    const customStyle: React.CSSProperties = { height: '100%' }
    return (
      <div style={divStyle}>
        <SyntaxHighlighter language="javascript" style={atelierEstuaryLight} customStyle={customStyle} showLineNumbers wrapLongLines >
          {projectInfo ? projectInfo.pkg : '未获取到pkg'}
        </SyntaxHighlighter>
      </div>
    )
  }

  const renderAll = () => {
    const fullHeightStyle: React.CSSProperties = { height: '100%' }
    const colLeftStyle: React.CSSProperties = { height: '100%', overflow: 'auto', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }
    const colRightStyle: React.CSSProperties = { height: '100%', overflow: 'auto' }
    return (
      <div style={fullHeightStyle}>
        <Row style={fullHeightStyle}>
          <Col span={16} style={colLeftStyle}>
            {renderLeft()}
          </Col>
          <Col span={8} style={colRightStyle}>{renderRight()}</Col>
        </Row>
      </div >
    )
  }

  return renderAll()

}
export default Project
