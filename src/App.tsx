import { useState } from 'react'
import './index.css'

/**
 * 职位接口
 */
interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  posted: string
}

/**
 * 示例职位数据
 */
const JOB_LISTINGS: Job[] = [
  { id: 1, title: '高级前端工程师', company: '科技公司 A', location: '北京', salary: '30-50K', type: '全职', posted: '2 小时前' },
  { id: 2, title: '后端开发工程师', company: '互联网企业 B', location: '上海', salary: '25-40K', type: '全职', posted: '5 小时前' },
  { id: 3, title: '全栈工程师', company: '创业公司 C', location: '深圳', salary: '35-55K', type: '全职', posted: '1 天前' },
  { id: 4, title: 'UI/UX 设计师', company: '设计公司 D', location: '杭州', salary: '20-35K', type: '全职', posted: '2 天前' },
  { id: 5, title: 'DevOps 工程师', company: '云服务公司 E', location: '广州', salary: '30-45K', type: '全职', posted: '3 天前' },
]

/**
 * 招聘平台主组件
 * @returns {React.JSX.Element} 招聘平台主界面
 */
function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('jobs')

  const filteredJobs = JOB_LISTINGS.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo">💼</span>
          <span className="brand-name">RecruitPro</span>
        </div>
        <div className="nav-links">
          <button
            className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            职位
          </button>
          <button
            className={`nav-link ${activeTab === 'companies' ? 'active' : ''}`}
            onClick={() => setActiveTab('companies')}
          >
            公司
          </button>
          <button
            className={`nav-link ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            简历
          </button>
        </div>
        <button className="btn-post">发布职位</button>
      </nav>

      {/* 主内容区 */}
      <main className="main-content">
        {/* 搜索区 */}
        <section className="search-section">
          <h1 className="main-title">找到你的理想工作</h1>
          <p className="subtitle">连接人才与机遇</p>
          <div className="search-box">
            <input
              type="text"
              placeholder="搜索职位或公司..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">搜索</button>
          </div>
        </section>

        {/* 职位列表 */}
        {activeTab === 'jobs' && (
          <section className="jobs-section">
            <div className="section-header">
              <h2 className="section-title">热门职位</h2>
              <span className="job-count">{filteredJobs.length} 个职位</span>
            </div>
            <div className="job-list">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}

        {/* 公司列表占位 */}
        {activeTab === 'companies' && (
          <section className="companies-section">
            <h2 className="section-title">热门公司</h2>
            <p className="empty-state">公司列表即将上线...</p>
          </section>
        )}

        {/* 简历上传占位 */}
        {activeTab === 'resume' && (
          <section className="resume-section">
            <h2 className="section-title">我的简历</h2>
            <div className="upload-area">
              <span className="upload-icon">📄</span>
              <p>拖拽简历到此处或点击上传</p>
              <button className="btn-upload">选择文件</button>
            </div>
          </section>
        )}
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <p>© 2026 RecruitPro. 极简招聘，高效匹配。</p>
      </footer>
    </div>
  )
}

/**
 * 职位卡片组件
 * @param {{ job: Job }} props - 职位数据
 * @returns {React.JSX.Element} 职位卡片
 */
function JobCard({ job }: { job: Job }) {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-salary">{job.salary}</span>
      </div>
      <div className="job-company">{job.company}</div>
      <div className="job-meta">
        <span className="job-location">📍 {job.location}</span>
        <span className="job-type">{job.type}</span>
        <span className="job-posted">{job.posted}</span>
      </div>
      <button className="btn-apply">立即申请</button>
    </div>
  )
}

export default App
