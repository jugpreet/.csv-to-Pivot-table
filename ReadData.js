import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { Button, Table } from 'antd';
import './ReadData.css';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';



const buttonRef = React.createRef()

export default class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      columns: [],
      dataSource: []
    }
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (row) => {
    let rowData = row.map(r => r.data)

    const columns = rowData[0].map(name => {
      return {
        title: name,
        dataIndex: name,
        key: name,
      }
    })
    const dataSource = []
    for (let i = 1; i < rowData.length; i++) {

      let obj = {
        NAME: rowData[i][0],
        AGE: rowData[i][1],
        GRADE: rowData[i][2],
        MARKS: rowData[i][3]

      }
      dataSource.push(obj)
    }
    this.setState({
      tableData: rowData,
      columns,
      dataSource
    })
    return rowData;
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log(data)
  }

  handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    const { tableData, columns, dataSource } = this.state;
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "center",
                width: '100%',
                marginTop: '10px'
              }}>
                <Button onClick={this.handleOpenDialog}>
                  Browe file
            </Button>
                <div style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',

                  width: '60%'
                }} >
                  {file && file.name}
                </div>
                <Button
                  onClick={this.handleRemoveFile}
                >
                  Remove
            </Button>
              </div>
            </div>
          )}
        </CSVReader>
        <h3>PIVOT Table</h3>
        <div style={
          {
            marginTop: 16,
            paddingleft: 100,
            paddingTop: 3
          }}  >
          <PivotTableUI
            data={tableData}
            onChange={() => { }}
            {...this.state}
          />
        </div>
        <br />
        <h3>Table</h3>

        <Table dataSource={dataSource} columns={columns} />

      </>


    )
  }

}