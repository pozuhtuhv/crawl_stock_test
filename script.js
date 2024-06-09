// 모의 데이터 (실제 앱에서는 API 호출 등을 통한 동적 데이터 로딩 필요)
const stocks = [
    {name: "Apple", code: "AAPL", dividendDate: "2023-05-10", dividend: 4.00, price: 150.00},
    // 추가 주식 정보...
];

function displayExchangeRate(rate) {
    document.getElementById('exchange-rate').innerText = `현재 환율: ${rate}`;
}

// 실제 환율 API 호출 함수를 구현해야 합니다. 아래는 예시로 정적 데이터를 사용합니다.
function fetchExchangeRate(countryCode) {
    // API 호출 대신 정적 데이터 반환
    if (countryCode === 'US') return 1.2; // USD to KRW 예시
    // 다른 환율 로직 추가...
}

document.getElementById('country-select').addEventListener('change', function() {
    const selectedCountry = this.value;
    fetchExchangeRate(selectedCountry).then(rate => displayExchangeRate(rate));
});

function searchStock() {
    const searchTerm = document.getElementById('search-stock').value.trim().toUpperCase();
    const stock = stocks.find(s => s.name.includes(searchTerm) || s.code === searchTerm);

    if (stock) {
        document.getElementById('stock-info').innerHTML = `
            <h2>${stock.name} (${stock.code})</h2>
            <p>배당일: ${stock.dividendDate}</p>
            <p>배당금: $${stock.dividend}</p>
            <p>현재 가격: $${stock.price}</p>
        `;
    } else {
        document.getElementById('stock-info').innerText = '주식을 찾을 수 없습니다.';
    }
}
