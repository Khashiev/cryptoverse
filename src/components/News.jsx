import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
// import moment from "moment/moment";
import { useGetCryptoNewsQuery } from "../services/CryptoNewsApi";
import { useGetCryptosQuery } from "../services/CryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return "Loading...";

  return (
    <div>
      {!simplified && (
        <Col span={24} style={{marginBottom: 20}}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name} key={coin.uuid}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, idx) => (
          <Col xs={24} sm={12} lg={8} key={idx}>
            <Card className="news-card" hoverable>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxWidth: 200, maxHeight: 100 }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="img"
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : `${news.description}`}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                      alt="news"
                    />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
