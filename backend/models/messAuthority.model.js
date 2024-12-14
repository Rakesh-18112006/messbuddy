import mongoose from "mongoose";

const messAuthoritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    role: {
      type: String,
      required: [true, "Role is required."],
      enum: {
        values: ["mr", "higher"],
        message: "{VALUE} is not a valid role. Accepted values are 'mr' or 'higher'.",
      },
    },
    authority_role: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.role === "higher" && (!value || value.trim() === "")) {
            return false;
          }
          return true;
        },
        message: "Authority role is required when role is 'higher'.",
      },
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required."],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [5, "Password must be at least 5 characters long."],
    },
  },
  { timestamps: true }
);

const MessAuthority = mongoose.model("MessAuthority", messAuthoritySchema);

export default MessAuthority;
