import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth'
import { useAuthStore } from '../../store/authStore'
import BrandLogo from '../../components/BrandLogo'

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.login(form)
      setAuth(res.data.accessToken, { nickname: res.data.nickname })
      navigate('/')
    } catch (err) {
      setError(err.message || err.data?.message || '이메일 또는 비밀번호를 확인해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen mystical-bg flex flex-col items-center justify-center px-container-margin">
      <div className="w-full max-w-app">
        <BrandLogo />

        {/* 카드 */}
        <div className="bg-surface-container-lowest rounded-lg p-8 shadow-purple-md">
          <h2 className="text-headline-sm font-semibold text-on-surface mb-6">로그인</h2>

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
              <label className="text-label-md text-on-surface-variant">비밀번호</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
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
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>

        {/* 회원가입 링크 */}
        <p className="text-center text-body-md text-on-surface-variant mt-6">
          아직 계정이 없으신가요?{' '}
          <Link to="/signup" className="text-tertiary font-semibold">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
