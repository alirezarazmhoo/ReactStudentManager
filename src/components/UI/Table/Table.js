
import React, {Component} from 'react'
import './Table.css';


class Table extends Component {
      constructor(props) {
      super(props) 
     
   }
     renderTableData() {
      return this.props.personsArray.map((persons, index) => {
         const { id, name, lastname, nationalcode, address , url } = persons 
         return (
            <tr id={id}>
               <td><button  onClick={this.props.question} className="btn btn-danger">حذف</button>|<button onClick={this.props.edit} className="btn btn-primary">ویرایش</button></td>
               <td> { url == null ? "noImage" :  <img src={"http://localhost:81"+ url}/>} </td>
               <td>{address}</td>
               <td>{nationalcode}</td>
               <td>{lastname}</td>
               <td>{name}</td>
               <td>{id}</td>
            </tr>
         )
      })
   }
renderHeaderTableData(){
   const listItems = this.props.headers.map((header)=><th>{header}</th>);
          return(
            <tr>
            {listItems}
            </tr>
         )
}
    render() {
        return (
          <div>
            <table id='customers'>
<tbody>
    {this.renderHeaderTableData()}

  {this.renderTableData()}
</tbody>

            </table>
            <div className="pagination">
  <a onClick={this.props.nextPage}>❮</a>
  <a onClick={this.props.previousPage}>❯</a>
</div>
         </div>
        )
    }
}

export default Table;
