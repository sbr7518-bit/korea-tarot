import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth'
import { useAuthStore } from '../../store/authStore'

export default function SignupPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [form, setForm] = useState({ email: '', nickname: '', password: '', passwordConfirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않아요.')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.signup({ email: form.email, password: form.password, nickname: form.nickname })
      setAuth(res.data.access_token, { nickname: res.data.nickname })
      navigate('/')
    } catch (err) {
      setError(err.message || '회원가입에 실패했어요. 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen mystical-bg flex flex-col items-center justify-center px-container-margin">
      <div className="w-full max-w-app">
        {/* 로고 */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-xl bg-primary-container flex items-center justify-center mx-auto mb-4 shadow-purple-md">
            <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <h1 className="text-headline-lg-mobile font-bold text-on-surface tracking-tight">Mistik Tarot</h1>
          <p className="text-body-md text-on-surface-variant mt-1">AI 타로 상담 서비스</p>
        </div>

        {/* 카드 */}
        <div className="bg-surface-container-lowest rounded-lg p-8 shadow-purple-md">
          <h2 className="text-headline-sm font-semibold text-on-surface mb-6">회원가입</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md text-on-surface-variant">이메일</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="bg-surface-container-low rounded-full px-5 py-3 text-body-md text-on-surface placeholder:text-outline outline-none focus:ring-2 focus:ring-tertiary-container transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md text-on-surface-variant">닉네임</label>
              <input
                name="nickname"
                type="text"
                value={form.nickname}
                onChange={handleChange}
                placeholder="2~20자로 입력하세요"
                minLength={2}
                maxLength={20}
                required
                className="bg-surface-container-low rounded-full px-5 py-3 text-body-md text-on-surface placeholder:text-outline outline-none focus:ring-2 focus:ring-tertiary-container transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md text-on-surface-variant">비밀번호</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="8자 이상 입력하세요"
                minLength={8}
                required
                className="bg-surface-container-low rounded-full px-5 py-3 text-body-md text-on-surface placeholder:text-outline outline-none focus:ring-2 focus:ring-tertiary-container transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md text-on-surface-variant">비밀번호 확인</label>
              <input
                name="passwordConfirm"
                type="password"
                value={form.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                required
                className="bg-surface-container-low rounded-full px-5 py-3 text-body-md text-on-surface placeholder:text-outline outline-none focus:ring-2 focus:ring-tertiary-container transition"
              />
            </div>

            {error && (
              <p className="text-label-md text-error bg-error-container rounded-md px-4 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-secondary-container text-white font-semibold text-label-md rounded-full mt-2 active:scale-[0.98] transition-transform disabled:opacity-60"
            >
              {loading ? '가입 중...' : '시작하기'}
            </button>
          </form>
        </div>

        {/* 로그인 링크 */}
        <p className="text-center text-body-md text-on-surface-variant mt-6">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-tertiary font-semibold">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
