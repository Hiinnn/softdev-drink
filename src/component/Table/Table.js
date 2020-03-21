import React, {Component} from 'react';
import './Table.css';

class Table extends Component {
  render() {
	const { type,data1,data2,data3,data4,data5
		,data6,data7,data8,data9,data10
		,data11,data12,data13,tableNum } = this.props
	
    return (
      <table>
		<thead className = {type}>
          <tr>
			<th className="col1">{type}</th>
			{!tableNum &&
            <th className="col2">AMOUNT</th>}
			{tableNum &&
            <th className="col2">{tableNum}</th>}
          </tr>
		  
        </thead >
        <tbody>
			{data1 && 
		  <tr>
            <td className="or">{data1}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		
		{data2 && 
		  <tr>
			<td className="or">{data2}</td>
			<td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data3 &&  
		  <tr>
            <td className="or">{data3}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data4 && 
		  <tr>
            <td className="or">{data4}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data5 &&
		  <tr>
            <td className="or">{data5}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data6 &&
		  <tr>
            <td className="or">{data6}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data7 &&
		  <tr>
			<td className="or">{data7}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data8 &&
		  <tr>
            <td className="or">{data8}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data9 &&
		  <tr>
            <td className="or">{data9}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
		  </tr>}
		{data10 &&
		  <tr>
            <td className="or">{data10}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data11 &&
		  <tr>
            <td className="or">{data11}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data12 &&
		  <tr>
            <td className="or">{data12}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
		{data13 &&
		  <tr>
            <td className="or">{data13}</td>
            <td><img src={require("../../asset/MainBackground/minus.png")}/>
				0
				<img src={require("../../asset/MainBackground/plus.png")}/></td>
          </tr>}
        </tbody>
      </table>
    )
  }
}

export default Table;