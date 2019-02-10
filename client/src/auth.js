function isAuthenticated() {
  return (
    document.cookie.split(';').filter(item => item.includes('connect.sid='))
      .length > 0
  );
}

export default isAuthenticated;
