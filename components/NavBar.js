import React from 'react';
import Link from 'next/link'
import {auth} from '../firebase'

export default function NavBar({user}) {
 
  return(<nav>
    <div className="nav-wrapper #fff8e1 amber lighten-5">
      <Link href="/"><a className="brand-logo"></a></Link>
      <ul id="nav-mobile" className="right">
      <li><Link href="/"><a> Blogs</a></Link></li>

        {user?
        <>
          <li><Link href="/Createblog"><a>Create Blog</a></Link></li>
          <li> <button  className="btn red" onClick={()=>auth.signOut()}>Logout</button></li>
        </>
        
        :
            <>
            <li><Link href="/signup"><a>Signup</a></Link></li>
            <li><Link href="/login"><a>Login</a></Link></li>
            </>
        }
        
      </ul>
    </div>
  </nav>) ;
}
