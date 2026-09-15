# 믿음상공사 검색엔진 등록 안내

사이트: https://trust-corporation.github.io/

사이트맵: https://trust-corporation.github.io/sitemap.xml

## 현재 사이트에 반영한 내용

- 홈페이지와 육각 렌치, 별 렌치, 볼 렌치의 독립된 제품 페이지
- 페이지별 제목, 설명, canonical, 공유 이미지와 구조화 데이터
- 서로 연결되는 제품 링크, 실제 제품 사진 및 견적 문의 안내
- 네 페이지와 대표 사진을 포함한 XML 사이트맵
- 모든 검색엔진의 수집을 허용하는 robots.txt
- 원본 사진을 보존한 웹용 경량 이미지

가격, 재고, 인증, 후기, 확정되지 않은 규격은 만들지 않았습니다. 공개 가격이나 실제 후기 없이 제품 스니펫 요건을 충족할 수 없으므로 Product 마크업은 사용하지 않습니다. 홈페이지는 CollectionPage와 ItemList, 제품 안내는 WebPage로 표현하고 업체 정보와 탐색경로를 연결합니다. 일반 웹 검색 노출과 가격·별점이 붙는 제품 리치 결과는 별개입니다.

## 소유자 계정에서 진행할 단계

### L렌치 규격서 검색 최적화 (2026-09-15)

- 대표 주소: https://trust-corporation.github.io/products/hex-wrench.html (수집 요청에는 `#size-chart`를 붙이지 않습니다.)
- 제목: 육각렌치·L렌치 규격표 및 사이즈 도면 | 믿음상공사
- 1.27–14 mm 11종 규격과 도면, PNG 다운로드를 설명·본문·내부 링크에 반영했습니다.
- 도면과 규격서 PNG에 ImageObject 정보를 연결하고, 이미지 사이트맵에 두 파일을 추가했습니다. PNG는 페이지의 이미지 미리보기에서도 확인할 수 있습니다.
- 홈페이지와 육각렌치 페이지의 사이트맵 수정일을 실제 변경일로 갱신했습니다.

배포 후 Google Search Console의 URL 검사에서 위 대표 주소에 **색인 생성 요청**, 네이버 서치어드바이저의 **요청 → 웹 페이지 수집**에서 같은 주소에 수집 요청을 진행합니다. 사이트맵이 미등록 상태라면 https://trust-corporation.github.io/sitemap.xml 을 제출합니다. 요청 완료 여부는 각 관리 도구에서 확인해야 합니다.

추적할 검색어: 육각렌치, L렌치, 육각렌치 규격표, L렌치 사이즈, 육각렌치 치수, L렌치 규격서. 메타 정보와 구조화 데이터는 콘텐츠 이해를 돕고 상위 순위를 보장하지 않습니다. 검색 결과의 제목·설명과 반영 시점은 검색엔진이 결정합니다.

공식 기준: [Google 제목 링크](https://developers.google.com/search/docs/appearance/title-link?hl=ko), [Google 이미지 사이트맵](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=ko), [네이버 콘텐츠 마크업](https://searchadvisor.naver.com/guide/markup-content).

### 네이버 IndexNow 변경 알림

`indexnow-key.txt`는 네이버 공식 방식에 따라 사이트에 공개하는 소유 확인 파일입니다. 배포가 완료된 후 다음 명령으로 홈페이지와 규격서 페이지의 갱신을 네이버에 알릴 수 있습니다.

```sh
node scripts/notify-search.cjs
```

다른 페이지를 수정했다면 전체 URL을 인자로 지정합니다. HTTP 200은 전송 성공, 202는 접수 후 소유 확인 중이며, 실제 수집·색인·검색 순위가 확정됐다는 뜻은 아닙니다. Google의 색인 요청과는 별도입니다. [네이버 공식 IndexNow 안내](https://searchadvisor.naver.com/guide/indexnow-request)

### Google Search Console

1. https://search.google.com/search-console 에 사업체가 관리할 Google 계정으로 로그인합니다.
2. 속성 추가에서 **URL 접두어**를 선택하고 https://trust-corporation.github.io/ 를 입력합니다. github.io의 DNS를 관리하지 않으므로 도메인 방식 대신 URL 접두어 방식을 사용합니다.
3. 소유권 확인에서 HTML 태그를 선택합니다. 발급된 google-site-verification 메타 태그를 개발자에게 전달해 홈페이지 head에 반영합니다. 비밀번호나 로그인 토큰은 전달하지 않습니다.
4. 반영·배포 후 소유권 확인을 완료하고 Sitemaps에서 sitemap.xml을 제출합니다.
5. URL 검사에서 홈페이지와 제품 페이지를 검사하고 색인 생성을 요청합니다.

### 네이버 서치어드바이저

1. https://searchadvisor.naver.com/ 에 사업체가 관리할 네이버 계정으로 로그인합니다.
2. 웹마스터 도구의 사이트 등록에 https://trust-corporation.github.io/ 를 입력합니다.
3. HTML 태그 방식으로 발급된 naver-site-verification 메타 태그를 개발자에게 전달합니다.
4. 홈페이지 반영·배포 후 소유 확인을 완료합니다.
5. 요청의 사이트맵 제출에서 https://trust-corporation.github.io/sitemap.xml 을 제출하고 웹 페이지 수집을 요청합니다.

### Bing Webmaster Tools

https://www.bing.com/webmasters/ 에서 사이트를 추가합니다. 화면에서 제공하는 소유 확인 절차를 완료하고 같은 사이트맵을 제출합니다. Google Search Console 가져오기가 제공되면 이미 확인한 속성을 이용할 수 있습니다.

다른 검색 서비스도 해당 서비스가 제공하는 공식 등록 경로를 사용합니다. 모든 검색 서비스의 노출이나 순위를 일괄 보장하는 설정은 없습니다.

## 등록할 제품 주소

- https://trust-corporation.github.io/products/hex-wrench.html
- https://trust-corporation.github.io/products/star-wrench.html
- https://trust-corporation.github.io/products/ball-wrench.html

## 실제 검색 성과를 높이기 위해 필요한 자료

1. 품목별 공급 규격, 긴 쪽·짧은 쪽 길이, 재질, 표면 처리, 포장 단위 등 확인된 사양표
2. 실제 최소 주문 수량과 견적·납품 조건
3. 공개 가능한 사업자 정보와 실적 증빙

확인된 자료가 생기면 해당 제품 페이지를 보강합니다. 오타마다 동일한 페이지를 만들거나 숨김 키워드, 링크 구매, 허위 후기, 허위 최저가를 추가하지 않습니다.

## 등록 후 확인할 지표

- 홈페이지 및 세 제품 페이지의 색인 여부
- 실제 노출된 검색어와 제품별 노출 수·클릭 수
- 모바일 사용성과 페이지 로딩 문제
- 문의 고객이 알려주는 유입 경로와 문의 품목

관찰할 검색어 예시: 육각렌치 대량구매, L렌치 주문제작, 별렌치 제조, 볼렌치 대량주문, 인천 렌치 공장, 믿음상공사.

검색 콘솔 등록, 수집 요청과 사이트맵 제출은 색인이나 상위 순위를 보장하지 않습니다. 반영 기간도 검색엔진의 판단에 따라 달라집니다.

## 공식 참고 문서

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko
- https://support.google.com/webmasters/answer/9008080?hl=ko
- https://searchadvisor.naver.com/guide/seo-basic-intro
- https://searchadvisor.naver.com/guide/request-feed
