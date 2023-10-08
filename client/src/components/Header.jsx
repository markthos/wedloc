const Header = () => {
  return (
    <div style={{display:"flex"}}>
      <h1>wedloc</h1>
      <ul style={{display:"flex", listStyle: "none", gap: "10px"}}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/singleview">SingleView</a>
          </li>
          <li>
            <a href="/eventspace">EventSpace</a>
          </li>
          <li>
            <a href="/livechat">LiveChat</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
          <li>
            <a href="/upload">Upload</a>
          </li>
        </ul>
    </div>
  )
}

export default Header
