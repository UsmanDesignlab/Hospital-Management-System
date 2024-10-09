import { Request, Response, NextFunction } from "express"
import users from "./User.service";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateOTP } from "./User.otp";
import { sendEmail } from "./User.email";



export const userRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, phoneNumber } = req.body;

    // Check if the user already exists
    const existingUser = await users.findOne(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and its expiration time (10 minutes)
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Create user with hashed password and OTP
    const newUser = await users.AllCreates({
      username,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      otp,
      otpExpires,
      isVerified: false,
    });

    // Send OTP to user's email
    await sendEmail(email, 'Verify Your Email', `Your OTP is: ${otp}`);

    res.status(201).json({
      message: 'User registered. Please check your email for OTP verification.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await users.findOne(email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if OTP is valid and not expired
    if (user.otp !== otp || user.otpExpires! < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark the user as verified and clear OTP fields
    user.isVerified = true;
    user.otp || undefined || null;
    user.otpExpires || undefined || null;
    await user.save();

    if (user.isVerified) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        'secret',
        { expiresIn: '4h' }  // Token expiration time
      );

      req.user = token

      res.status(200).json({ message: 'Email verified successfully', token });
    }
    if (!user.isVerified) {
      res.status(200).json({ message: 'You are not registered' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const loginRegister = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const one = await users.findOne(email);

    if (!one) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (!one.isVerified === true) {
      return res.status(400).json({ message: 'OTP NOT VERIFIED' });
    }
    if (one.isVerified === true) {
      bcrypt.compare(password, one.password, function (err, result) {
        if (err) {
          return res.status(500).json({ message: "Error comparing passwords" });
        }

        // If passwords match
        if (result) {
          const token = jwt.sign({ id: one.id, role: one.role, email: one.email }, "secret", { expiresIn: "4h" });
          console.log(one.id);
          console.log(one.role);
          console.log(one.email)

          // Set cookies and send success response
          res.cookie("token", token);
          return res.status(200).json({ message: "Login successful", token });
        }

      })
    };
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const userLogout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "");
    return res.status(200).json("Register Logout");
  }
  catch (err) {
    console.log(err);
    res.send("An Error Occurred")
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await users.findOne(email)
    if (!user) {
      return res.send("Something went wrong");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let one = await users.Update({ password: hash }, { where: { email } })
          if (!one) {
            return res.send("Something went wrong");
          } else {
            let token = jwt.sign({ email }, "secret", { expiresIn: "4h" })
            res.cookie("token", token)
            res.status(200).json({
              message: "Change password Successfully", token
            });
          }
        });
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(200).json("Error Occurred");
  }
}

export const user = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await users.findOne(email)
    if (!user) {
      return res.status(403).json("Something went wrong");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let one = await users.Update({ password: hash }, { where: { email } })
          if (!one) {
            return res.send("Something went wrong");
          } else {
            let token = jwt.sign({ email }, "secret", { expiresIn: "4h" })
            res.cookie("token", token)
            res.status(200).json({
              message: "Change password Successfully", token
            });
          }
        });
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(200).json("Error Occurred");
  }
}
