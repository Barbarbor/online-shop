import {Link} from 'react-router-dom';
const AdminPage = () =>{
    return(
        <div style={{position:"absolute",top:'20%',left:'10%',display:'flex',flexDirection:'column'}}>
            <h2> Admin dashboard</h2> <br/>  <p> Choose admin management</p>
            <Link to='/admin/products'>Product Management</Link>
            <Link to='/admin/categories'>Category Management</Link>
            <Link to='/admin/subcategories'>Subcategory Management</Link>

        </div>
    )
}
export default AdminPage;