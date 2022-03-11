/*
 * @Author: Archy
 * @Date: 2022-01-30 20:30:41
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-11 15:18:03
 * @FilePath: \arkgen\react\src\pages\project\index.tsx
 * @description: 
 */
import React, { useState, useEffect } from "react";
import { notification, Row, Col, Tree, Card, Descriptions, Spin, List, Button } from "antd";
import type { CardTabListType } from 'antd/lib/card'
import { getProjectInfo, getDir, getFile, getTaskList, getDependenceList } from "../../api/project";
import type { DirType, ProjectInfo, TaskListType, DependenceList } from "../../api/project"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useCmd } from "../../hooks/useCmd";
const { DirectoryTree } = Tree

import './index.less'
const Project: React.FC = () => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>()
  const [dirs, setDirs] = useState<DirType[]>()
  const [selectFileType, setSelectFileType] = useState<string>('plaintext')
  const [content, setContent] = useState<string>('')
  const [rightSpin, setRightSpin] = useState<boolean>(false)
  const [taskList, setTaskList] = useState<TaskListType[]>([])
  const [dependenceList, setDependenceList] = useState<DependenceList[]>([])
  const cardHeaderStyle: React.CSSProperties = { display: 'flex', height: '3rem', alignItems: 'center' }
  const runCmd = useCmd()
  const handleProjectInfo = async () => {
    const result = await getProjectInfo()
    if (result.success) {
      setProjectInfo(result.data)
      setDirs(result.data?.dirs)
      if (result.data.hasPkg) {
        setContent(result.data.pkg)
        setSelectFileType('json')
      }
    } else {
      notification.error({ message: '获取项目信息出错：' + result.msg })
    }
  }

  const handleProjectTaskList = async () => {
    const result = await getTaskList()
    if (result.success) {
      setTaskList(result.data)
    } else {
      notification.error({ message: '获取项目信息出错：' + result.msg })
    }
  }

  const handleProjectDependenceList = async () => {
    const result = await getDependenceList()
    if (result.success) {
      setDependenceList(result.data)
    } else {
      notification.error({ message: '获取项目信息出错：' + result.msg })
    }
  }

  useEffect(() => {
    handleProjectInfo()
    handleProjectTaskList()
    handleProjectDependenceList()
  }, [])

  const renderProjectCard = () => {
    const cardStyle: React.CSSProperties = { marginBottom: '8px' }
    if (projectInfo) {
      return (
        <Card title="项目详情" headStyle={cardHeaderStyle} style={cardStyle}>
          <Descriptions>
            {projectInfo.hasPkg ?
              <>
                <Descriptions.Item label="名称">{JSON.parse(projectInfo.pkg).name}</Descriptions.Item>
                <Descriptions.Item label="作者">{JSON.parse(projectInfo.pkg).author}</Descriptions.Item>
                <Descriptions.Item label="版本">{JSON.parse(projectInfo.pkg).version}</Descriptions.Item>
                <Descriptions.Item label="授权">{JSON.parse(projectInfo.pkg).license} </Descriptions.Item>
                <Descriptions.Item label="代码库" span={2}><a target='_blank' href={JSON.parse(projectInfo.pkg).repository.url.split('+')[1]}>
                  {JSON.parse(projectInfo.pkg).repository.url.split('+')[1]}</a>
                </Descriptions.Item>
                <Descriptions.Item label="描述" span={3}>{JSON.parse(projectInfo.pkg).description}</Descriptions.Item>
              </>
              :
              <>
                <Descriptions.Item label="路径">{projectInfo.path}</Descriptions.Item>
                <Descriptions.Item>未找到package.json文件</Descriptions.Item>
              </>
            }

          </Descriptions>
        </Card>
      )
    } else {
      return (<Card title="项目详情" headStyle={cardHeaderStyle} style={cardStyle}>未获取到项目</Card>)
    }
  }

  const renderLeftBody = () => {
    const rowStyle: React.CSSProperties = { padding: 8, paddingRight: 0, height: '100%' }
    const colStyle: React.CSSProperties = { flexDirection: 'column', display: 'flex', height: '100%' }
    const fullHeightStyle: React.CSSProperties = { height: '100%' }
    return (
      < Row style={rowStyle} gutter={8}>
        <Col span={16} style={colStyle}>
          {renderProjectCard()}
          {renderDetailList()}
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

    const onSelect = async (key: (string | number)[], { node }: any) => {
      if (node.type === 'file') {
        setRightSpin(true)
        getFile({ path: key.pop() }).then(res => {
          setRightSpin(false)
          if (res.success) {
            setContent(res.data.content)
            setSelectFileType(res.data.lang)
          } else {
            setContent('文件内容获取出错！')
            setSelectFileType('plaintext')
          }
        })
      }
    }

    const cardStyle: React.CSSProperties = { height: '100%' }
    const bodyStyle: React.CSSProperties = { height: 'calc(100% - 3rem)', overflow: 'auto' }
    return (
      <Card title="项目结构" style={cardStyle} headStyle={cardHeaderStyle} bodyStyle={bodyStyle}>
        <DirectoryTree treeData={dirs} loadData={onLoadData} titleRender={customRender} onSelect={onSelect}></DirectoryTree>
      </Card>
    )
  }

  const renderDetailList = () => {
    const cardStyle: React.CSSProperties = { flex: '1 0 auto', display: 'flex', flexDirection: 'column' }
    const bodyStyle: React.CSSProperties = { overflow: 'auto', flex: '1 1 auto', padding: '0', height: 0 }
    const gridStyle: React.CSSProperties = { width: '33.33%', textAlign: 'center', border: 'none', cursor: 'pointer' }
    const itemStyle: React.CSSProperties = { fontSize: '18px', display: 'flex', justifyContent: 'space-between' }
    const [activeTab, setActiveTab] = useState<string>('taskList')
    const openNpm = (depName: string) => {
      window.open('https://www.npmjs.com/package/' + depName)
    }
    const tablist: CardTabListType[] = [
      {
        key: 'taskList',
        tab: '任务列表',
      },
      {
        key: 'dependenceList',
        tab: '依赖列表',
      },
    ]

    const runTask = (cmd: any) => {
      console.log(cmd);
      runCmd(cmd)
    }
    const contentList: Record<string, JSX.Element> = {
      taskList: <List
        style={{ padding: '0 16px' }}
        size="large"
        bordered
        dataSource={taskList}
        renderItem={item =>
        (<List.Item key={item.name} style={itemStyle}>
          <div>
            <div>{item.name}</div>
            <div style={{ fontSize: '12px', color: 'gray' }}>{item.description}</div>
          </div>
          <Button onClick={() => { runTask(item.name) }}>运行</Button>
        </List.Item>)}
      />,
      dependenceList:
        <Card >
          {dependenceList.map((item) =>
          (
            <Card.Grid style={gridStyle} key={item.name} onClick={(e) => { openNpm(item.name) }}>
              <div>{item.name}</div>
              <div>{item.version}</div>
            </Card.Grid>
          ))
          }
        </Card>,
    }
    return (
      <Card tabList={tablist} className="project__detail-card" style={cardStyle} bodyStyle={bodyStyle} headStyle={cardHeaderStyle} activeTabKey={activeTab} onTabChange={(key: any) => {
        setActiveTab(key)
      }}>
        {contentList[activeTab]}
      </Card>
    )
  }

  const renderLeft = () => {
    return (
      <>
        {renderLeftBody()}
      </>)
  }

  const renderRight = () => {
    const divStyle: React.CSSProperties = { height: '100%', width: '100%' }
    const customStyle: React.CSSProperties = { height: '100%' }
    const spinStyle: React.CSSProperties = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }
    return (
      <div style={divStyle}>
        <Spin spinning={rightSpin} style={spinStyle} tip='正在打开文件' />
        <SyntaxHighlighter language={selectFileType} style={vs2015} customStyle={customStyle} showLineNumbers >
          {content}
        </SyntaxHighlighter>
      </div>
    )
  }

  const renderAll = () => {
    const fullHeightStyle: React.CSSProperties = { height: '100%' }
    const colLeftStyle: React.CSSProperties = { height: '100%' }
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
