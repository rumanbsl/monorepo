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


```jsonc
// codegen
type User @entity {
  id: String! @id
  username: String! @column
  email: String! @column
  profile: Profile! @link
  friendsCount: Int! # this field won't get a generated MongoDB field
  friends: [User]! @link
}

type Profile @entity(embedded: true) {
  name: String! @column
  age: Int! @column
}
```

will transform into
```jsonc
import { ObjectID } from 'mongodb';

export interface UserDbObject {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  profile: ProfileDbObject;
  friends: ObjectID[];
}

export interface ProfileDbObject {
  name: string;
  age: string;
}
```
