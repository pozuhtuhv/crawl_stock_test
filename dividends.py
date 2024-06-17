import matplotlib.pyplot as plt
import polars as pl
import seaborn as sns
import yfinance as yf

# 조회할 티커 심볼을 설정
ticker_symbol = 'CONY'  # 티커 심볼

# 주식 데이터
ticker = yf.Ticker(ticker_symbol)

# 과거 배당 데이터 수집
dividends = ticker.dividends

# 데이터 확인
if not dividends.empty:
    # 날짜 YYYY-MM-DD 포맷팅
    dividends.index = dividends.index.strftime('%Y-%m-%d')
    
    # polars 데이터프레임 변환
    dividends_pl = pl.DataFrame({
        'Date': dividends.index,
        'Dividends': dividends.values
    })
    
    # 배당내역
    print(dividends_pl)
    # 배당평균
    avg_dividend = dividends_pl.select(pl.col('Dividends').mean()).to_numpy()[0,0]
    print(f"총 배당 평균 {avg_dividend}")
    # 그래프 표시
    plt.figure(figsize=(10, 6))
    sns.lineplot(x='Date', y='Dividends', data=dividends_pl, marker='o')
    plt.title(f'{ticker_symbol} Graph')
    plt.xlabel('Date')
    plt.ylabel('Dividends')
    plt.xticks(rotation=45)
    plt.show() # 그래프 표시
else:
    print(f"{ticker_symbol}의 배당 내역이 없음.")
