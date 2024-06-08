import Paper from '@mui/material/Paper';
import { Grid, Table as TableMui, TableHeaderRow,TableSelection } from '@devexpress/dx-react-grid-material-ui'
import {Column, SelectionState, Table as TableGrid} from "@devexpress/dx-react-grid";
import "./Table.module.scss"
import {Dispatch,SetStateAction} from "react";
import DataCellProps = TableGrid.DataCellProps;

interface IColumns extends Column{}
interface IRows{}

interface ITable{
    columns?:IColumns[]
    rows?:IRows[]
    height:number
    selection:number[]
    setSelection:Dispatch<SetStateAction<(number | string)[]>>
}
//React.ComponentType<TableBase.DataCellProps>
export interface ICell extends DataCellProps{
    column:{
        render:(value:number | string,rows:IRows)=>void | null
    }
}

export const Cell = (props:ICell) => {
    const {column,row,value} = props
    if(column?.render){
        return <TableMui.Cell>{column?.render(value,row)}</TableMui.Cell>
    }
    return <TableMui.Cell>{value}</TableMui.Cell>
}

export const Table = (props:ITable) => {
    const {columns = [],rows = [],selection,setSelection} = props
    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
                // height={height}
            >
                <SelectionState
                    selection={selection}
                    onSelectionChange={setSelection}
                />
                <TableMui cellComponent={(props) => <Cell {...props} />} />
                <TableHeaderRow />
                <TableSelection selectByRowClick highlightRow showSelectionColumn={false} />
            </Grid>
        </Paper>
    );
};