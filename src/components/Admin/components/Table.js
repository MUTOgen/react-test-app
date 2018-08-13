import React, { Component } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import TableRow from './TableRow';
import AddForm from './AddForm';
import Pagination from './Pagination';

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            filterUsers: [],
            page: 1,
            filter: null
        }
    }

    onChangePage = (new_page) => {
        this.setState({page: new_page})
    }

    removeDeletedFromArray = (items,item) => {
        let usrs = [...items]
        for(let i=0; i < usrs.length; i++) {
            if(usrs[i].id === item.id)
            {
                usrs.splice(i,1);
            }
        }
        return usrs
    }

    onDeleteItem = (item) => {
        let new_filterUsers = this.removeDeletedFromArray(this.state.filterUsers,item)
        let new_users = this.removeDeletedFromArray(this.state.users,item)
        this.setState({users: new_users, filterUsers: new_filterUsers})
    }

    doFilter = (e) => {
        let filter = e.target.value
        let usrs = [...this.state.users]
        let filtered = []
        if(filter.length === 0){
            filter = null
            filtered = usrs
        }else{
            for(let i=0; i < usrs.length; i++) {
                if(usrs[i].id.toString().indexOf(filter) !== -1 || usrs[i].login.indexOf(filter) !== -1)
                {
                    filtered.push(usrs[i])
                }
            }
        }
        this.setState({filter: filter, filterUsers: filtered, page: 1})
    }

    onAdd = (item) => {
        let news_users = [...this.state.users, ...[item]]
        this.setState({users: news_users, filter: null, filterUsers: news_users})
    }

    componentDidMount(){
        const token = window.localStorage.getItem('token')
        axios.get(`https://us-club.pw/api/list.php?token=${token}`).then(response => {
            let data = response.data
            if('error' in data){
                alert(data.error)
                return
            }
            this.setState({users: data, filterUsers: data})
        })
    }

    render() {
        let {filterUsers, users, page} = this.state
        let perPage = this.props.perPage
        let rows = filterUsers.slice((page-1)*perPage,(page*perPage)).map((item) => {
            return <TableRow key={item.id.toString()} data={item} onDelete={this.onDeleteItem} />
        });

        return (
            <div className="user-table">
               <AddForm onAdd={this.onAdd}/>
               { users.length ?
                    <div className="table">
                        <div className="filter-container">
                            <input type="text" className="filter" name="filter" onChange={this.doFilter} placeholder="Search rows in table" />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Controls</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {rows}
                            </tbody>
                        </table>
                        <Pagination page={page} perPage={perPage} total={filterUsers.length} pages={Math.ceil(filterUsers.length/perPage)} onChangePage={this.onChangePage} />
                    </div> : 
                    <p>Loading data...</p> 
               }
            </div>
        );
    }
}

Table.propTypes = {
    perPage: propTypes.number.isRequired
}

export default Table;