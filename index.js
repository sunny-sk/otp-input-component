import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
// constants
const OtpInput = ({
  length = 4,
  hidden = false,
  otpConStyle,
  otpFieldTextStyle,
  otpFieldStyle,
  onChange,
}) => {
  let textInput = useRef(null);
  const [internalValue, setInternalValue] = useState("");
  const onChangeText = (e) => {
    if (typeof onChange === "function") onChange(e);
    setInternalValue(e);
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => textInput.current.blur()
    );
    return () => keyboardDidHideListener.remove();
  }, []);
  return (
    <>
      <View style={styles.container}>
        {/* otp Fields */}
        <TextInput
          selectionColor={"pink"}
          secureTextEntry={hidden}
          ref={textInput}
          value={internalValue}
          onChangeText={onChangeText}
          maxLength={length}
          returnKeyType="next"
          keyboardType="numeric"
          style={styles.otpHiddenInput}
        />
        <View style={{ ...styles.otpInpCon, ...otpConStyle }}>
          {new Array(length).fill("x").map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  ...styles.otpField,
                  borderColor:
                    index === internalValue.length ? "#000000" : "#ffff",
                  ...otpFieldStyle,
                }}
              >
                <Text
                  onPress={() => textInput.current.focus()}
                  style={{ ...styles.otpFieldText, ...otpFieldTextStyle }}
                >
                  {internalValue && internalValue.length > 0
                    ? internalValue[index]
                    : ""}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  otpInpCon: {
    width: "60%",
    marginLeft: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  otpField: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    borderBottomWidth: 1,
  },
  otpFieldText: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  otpHiddenInput: {
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
    paddingLeft: 20,
    borderRadius: 10,
    borderColor: "transparent",
    height: 1,
    width: 1,
    color: "transparent",
  },
});
