import React from 'react'
import Table from "./Table"
import "./styles.css"
export default function Result(props) {
    const {count,department,model,parameters} = props
    return (
        <div className="reportPrint">
          {props.logs.map((log,i) => {
              return <Table
               shift={log.shift}
               date={log.date}
               machines={log.machines} 
               key={i} 
               count={count} 
               department={department}
               model={model}
               parameters={parameters}
              />
          })}
            
        </div>
    )
}
