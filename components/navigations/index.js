import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ProductNavigation from "../products/ProductNavigation";
import UserNavigation from "../users/UserNavigation";
import { UserContext } from "../users/UserContext";
const index = (props) => {
  const { isLogin } = useContext(UserContext);
  console.log(isLogin);
  return (
    <NavigationContainer>
      {isLogin ? (
        <ProductNavigation db={props.db} />
      ) : (
        <UserNavigation db={props.db} />
      )}
    </NavigationContainer>
  );
};

export default index;
