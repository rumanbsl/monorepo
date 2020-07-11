```jsonc
// step 1
mutation {
  VERIFICATION_PHONE_START(phoneNumber: "+358442399056",withWhatsApp: true)
}
// step 2
mutation {
  VERIFICATION_PHONE_COMPLETE(phoneNumber: "+358442399056",key: "9519035")
}
// step 3
mutation {
  USER_EMAIL_SIGN_UP(
    name:"Majedul Hoque"
    email: "rumanbsl@gmail.com"
    password:"1234"
    profilePhoto: "https://images.pornpics.com/1280/201807/25/9403368/9403368_036_5241.jpg"
    age:33
    phoneNumber:"+358442399056"
  )
}
// step 4
mutation {
  USER_EMAIL_SIGN_IN(email:"rumanbsl@gmail.com", password: "1234")
}

// steep 5
query {
  GET_USER{
    _id
    email
  }
}

```
