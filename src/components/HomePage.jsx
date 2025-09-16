import React from 'react';
import { Button, Typography, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router';
import './HomePage.css';

const { Title, Paragraph } = Typography;

export const HomePage = () => {
    const navigate = useNavigate();

    const handleStartJourney = () => {
        navigate('/todos');
    };

    return (
        <div className="home-container">
            
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                    <div className="content-center">
                        <div className="poetry-container">
                            <div className="poetry-line first-line">
                                <Title 
                                    level={1} 
                                    className="brush-text"
                                    style={{ 
                                        fontSize: '3rem',
                                        fontFamily: '"STZhongsong", "华文中宋", "SimSun", serif',
                                        color: '#2c2c2c',
                                        fontWeight: 'normal',
                                        margin: '0',
                                        letterSpacing: '6px',
                                        textAlign: 'left'
                                    }}
                                >
                                    今日长缨在手，
                                </Title>
                            </div>
                            <div className="poetry-line second-line">
                                <Title 
                                    level={1} 
                                    className="brush-text"
                                    style={{ 
                                        fontSize: '3rem',
                                        fontFamily: '"STZhongsong", "华文中宋", "SimSun", serif',
                                        color: '#2c2c2c',
                                        fontWeight: 'normal',
                                        margin: '0',
                                        letterSpacing: '6px',
                                        textAlign: 'right'
                                    }}
                                >
                                    何时缚住苍龙？
                                </Title>
                            </div>
                        </div>
                        
                        {/* 按钮 */}
                        <div style={{ textAlign: 'center', marginTop: '60px' }}>
                            <Button 
                                type="text"
                                size="large"
                                onClick={handleStartJourney}
                                className="journey-button"
                                style={{
                                    height: '60px',
                                    padding: '0 40px',
                                    fontSize: '20px',
                                    fontFamily: '"STZhongsong", "华文中宋", "SimSun", serif',
                                    color: '#2c2c2c',
                                    border: 'none',
                                    background: 'transparent',
                                    letterSpacing: '4px',
                                    fontWeight: 'normal'
                                }}
                            >
                                今日历程
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;
