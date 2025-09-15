import React from 'react';
import { Typography, Space } from 'antd';
import './AboutPage.css';

const { Title, Text } = Typography;

const AboutPage = () => {
    return (
        <div className="about-container">
            <div className="content-wrapper">
                <Title 
                    level={1} 
                    className="main-title"
                    style={{
                        fontSize: '3rem',
                        fontFamily: '"STZhongsong", "华文中宋", serif',
                        color: '#2c2c2c',
                        textAlign: 'center',
                        marginBottom: '40px',
                        letterSpacing: '6px',
                        fontWeight: 'normal'
                    }}
                >
                    特别鸣谢
                </Title>

                <Space 
                    direction="horizontal" 
                    size="large" 
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    {/* Copilot */}
                    <div className="contributor-icon contributor-icon-1">
                        <div className="icon-wrapper" style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(10px)', border: '1px solid rgba(44,44,44,0.1)', transition: 'all .3s ease',
                            cursor: 'pointer', padding: '16px'
                        }}>
                            <img src="/githubcopilot.svg" alt="GitHub Copilot" style={{ width: 54, height: 54, objectFit: 'contain' }} />
                            <Text style={{ fontSize: 14, color: '#2c2c2c', marginTop: 8, fontWeight: 500 }}>GitHub Copilot</Text>
                        </div>
                    </div>

                    {/* DeepSeek */}
                    <div className="contributor-icon contributor-icon-2">
                        <div className="icon-wrapper" style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(10px)', border: '1px solid rgba(44,44,44,0.1)', transition: 'all .3s ease',
                            cursor: 'pointer', padding: '16px'
                        }}>
                            <img src="/deepseek-color.svg" alt="DeepSeek" style={{ width: 54, height: 54, objectFit: 'contain' }} />
                            <Text style={{ fontSize: 14, color: '#2c2c2c', marginTop: 8, fontWeight: 500 }}>DeepSeek</Text>
                        </div>
                    </div>
                </Space>
            </div>
        </div>
    );
};

export default AboutPage;
