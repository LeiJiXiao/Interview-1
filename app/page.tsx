"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"

import './home.css'

const schema = z.object({
  mobile: z.string()
    .min(11, "手机号必须是11位数字")
    .max(11, "手机号必须是11位数字")
    .regex(/^1[3-9]\d{9}$/, "请输入有效的手机号"),
  code: z.string()
    .min(6, "验证码必须是6位数字")
    .max(6, "验证码必须是6位数字")
})

type FormData = z.infer<typeof schema>

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const mobile = watch("mobile")

  const getCode = () => {
    // 模拟获取验证码
    setValue("code", "123456", { shouldValidate: true })
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data)
    setIsSubmitting(false)
  }
  
  return (
    <form>
      <div className="form-item">
        <input placeholder="手机号" {...register("mobile")} />
        {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
          )}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input placeholder="验证码" {...register("code")} />
          {/* getcode默认disabled=true，当mobile满足表单验证条件后才位false */}
          <button
            className="getcode"
            type="button"
            disabled={!!errors.mobile || !mobile}
            onClick={getCode}
          >
            获取验证码
          </button>
        </div>
        {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
      </div>

      {/* 表单提交中，按钮内的文字会变成“submiting......” */}
      <button
        className="submit-btn"
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? "提交中..." : "登录"}
      </button>
    </form>
  );
}
