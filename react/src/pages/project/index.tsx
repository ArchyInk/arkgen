/*
 * @Author: Archy
 * @Date: 2022-01-30 20:30:41
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-14 17:05:38
 * @FilePath: \arkgen\react\src\pages\project\index.tsx
 * @description: 
 */
import React, { useState, useEffect, ReactNode } from "react";
import { notification, Row, Col, Tree, Card } from "antd";
import { getProjectInfo, ProjectInfo, getDir, DirType } from "../../api/project";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
const { DirectoryTree } = Tree

import './index.less'
const Project: React.FC = () => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>()
  const [dirs, setDirs] = useState<DirType[]>()
  const cardHeaderStyle: React.CSSProperties = { display: 'flex', height: '3rem', alignItems: 'center' }
  const handleProjectInfo = async () => {
    const result = await getProjectInfo()
    if (result.success) {
      setProjectInfo(result.data)
      setDirs(result.data?.dirs)
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
    const rowStyle: React.CSSProperties = { padding: 8, paddingRight: 0, height: 'calc(100% - 3rem)' }
    const fullHeightStyle: React.CSSProperties = { height: '100%' }
    return (
      < Row style={rowStyle} gutter={8}>
        <Col span={16}>
          {renderTaskList()}
          {renderDependenciesList()}
        </Col>
        <Col span={8} style={fullHeightStyle}>
          {renderDirs()}
        </Col>
      </ Row>)
  }

  const renderDirs = () => {
    const updateDirs = (list: DirType[], key: string, children: DirType[], error?: boolean): DirType[] => {
      return list.map(dir => {
        if (dir.key === key) {
          if (error) {
            return {
              ...dir,
              type: 'error'
            }
          } else {
            return {
              ...dir,
              children,
            };
          }
        }

        if (dir.children) {
          return {
            ...dir,
            children: updateDirs(dir.children, key, children),
          };
        }
        return dir
      })
    }
    const onLoadData = ({ key }: any) => {
      return new Promise<void>((resolve) => {
        getDir({ path: key }).then(res => {
          if (res.success) {
            setDirs(updateDirs(dirs as DirType[], key, res.data))
            resolve()
          } else {
            setDirs(updateDirs(dirs as DirType[], key, res.data, true))
            resolve()
          }
        })
      })
    }

    const customRender = (nodeData: any) => {
      if (nodeData.type === 'error') {
        return <span style={{ color: 'red' }} title="打开失败">{nodeData.title}</span>
      } else {
        return <span>{nodeData.title}</span>
      }
    }
    const cardStyle: React.CSSProperties = { height: '100%' }
    const bodyStyle: React.CSSProperties = { height: 'calc(100% - 3rem)', overflow: 'auto' }
    return (
      <Card title="项目结构" style={cardStyle} headStyle={cardHeaderStyle} bodyStyle={bodyStyle}>
        <DirectoryTree treeData={dirs} loadData={onLoadData} titleRender={customRender}></DirectoryTree>
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
    const customStyle: React.CSSProperties = { height: '100%', background: 'white' }
    const switchLanguage = () => {

    }
    return (
      <div style={divStyle}>
        <SyntaxHighlighter language="json" style={atelierCaveLight} customStyle={customStyle} showLineNumbers wrapLongLines >
          {projectInfo ? projectInfo.pkg : '未获取到pkg'}
        </SyntaxHighlighter>
      </div>
    )
  }

  const renderAll = () => {
    const fullHeightStyle: React.CSSProperties = { height: '100%' }
    const colLeftStyle: React.CSSProperties = { height: '100%', overflow: 'auto' }
    const colRightStyle: React.CSSProperties = { height: '100%', overflow: 'auto' }
    return (
      <div style={fullHeightStyle}>
        <Row style={fullHeightStyle} gutter={16}>
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
