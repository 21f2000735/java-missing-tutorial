# Company Question Bank

As of April 7, 2026, this page groups target companies by the kind of interview pressure they create.

The goal is not to memorize one company’s leaked questions.
The goal is to practice the kind of thinking that company is likely to reward.

These questions and answers are original.
They are informed by public company career, interview, and engineering pages.

## Deeper Practice In This Site

This resource is now backed by a full book section:

- [sec21_company_interview_tracks/SectionGuide.md](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/SectionGuide.md)
- [ch01_google_meta_amazon/ChapterGuide.md](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch01_google_meta_amazon/ChapterGuide.md)
- [ch02_apple_coinbase_jane_street/ChapterGuide.md](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch02_apple_coinbase_jane_street/ChapterGuide.md)
- [ch03_netflix_makemytrip_hoteltrader/ChapterGuide.md](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch03_netflix_makemytrip_hoteltrader/ChapterGuide.md)

Use this page as the overview, then move into those chapters for runnable examples and deeper company-style reasoning.

## How To Use This Page

1. Pick the company or company group you care about.
2. Answer the question aloud before reading the sample answer.
3. Rewrite the answer in your own words using Java terms and system tradeoffs.
4. Pair the company bank with the matching sections of this site:
   - collections
   - streams
   - multithreading and concurrency
   - design patterns
   - exception handling
   - data structures and complexity

## Company Map

| Company | Why it belongs here | Interview pressure you should expect |
| --- | --- | --- |
| Google | Strong generalist engineering bar | algorithms, debugging, system design, clarity |
| Meta | Fast product engineering at massive scale | coding speed, practical systems, impact |
| Amazon | strong customer and ownership culture | coding, system design, STAR answers, tradeoffs |
| Apple | platform quality and high engineering standards | API design, correctness, performance, privacy |
| Netflix | distributed systems and operational excellence | reliability, scale, observability, judgment |
| Coinbase | money movement, trading, platform integrity | idempotency, consistency, security, availability |
| Jane Street | elite problem solving and correctness | algorithms, reasoning, code quality, collaboration |
| MakeMyTrip | travel search, booking, pricing, scale | caching, inventory, consistency, latency |
| HotelTrader | direct hotel distribution and APIs | GraphQL, data freshness, onboarding, uptime |

## Google

### What to prepare for

- clear problem solving
- structured communication
- data structures and algorithms
- system design with tradeoffs

### Question 1

How would you design an autocomplete service for travel searches?

### Answer

Start with the user need: low-latency suggestions while the user types.

- Use a prefix index such as trie-like storage or a search-optimized index.
- Store popularity signals so high-quality suggestions rank first.
- Cache hot prefixes aggressively because many users type similar inputs.
- Separate write-heavy update flow from read-heavy query flow.
- Measure p95 latency, suggestion relevance, and cache hit rate.

In Java, I would keep the online read path simple and fast, and move ranking updates into asynchronous jobs.

### Question 2

A Java service suddenly shows a latency jump after a new release. What do you do first?

### Answer

Start with narrowing, not guessing.

- Compare current and previous release metrics.
- Check which endpoints and which dependency calls got slower.
- Look at error rate, GC, thread states, and database timing together.
- Roll back or feature-flag if user impact is high.
- Reproduce with profiling only after the blast radius is clear.

The important signal is disciplined debugging. Google-style answers should sound methodical, not dramatic.

### Question 3

When would you choose a loop over a stream pipeline in Java?

### Answer

I choose a stream when the work is genuinely filter-map-collect style.
I choose a loop when:

- state changes are central
- step-by-step debugging matters
- the stream becomes harder to explain than the loop

The better answer is not "streams are modern."
It is "I choose the construct that makes intent obvious."

## Meta

### What to prepare for

- coding with speed and clarity
- practical backend design
- impact and tradeoff thinking
- debugging issues at product scale

### Question 1

How would you stop duplicate notifications from being sent during a retry storm?

### Answer

Make the notification flow idempotent.

- Generate a stable idempotency key from the business event.
- Store send state keyed by that id.
- Retry safely without producing a second user-visible notification.
- Add expiry or cleanup for old dedupe keys.

The Meta-style strength is practical engineering under scale, not theoretical beauty.

### Question 2

A feed service has one very hot shard. What would you inspect?

### Answer

- traffic distribution by key
- whether the partitioning key is skewed
- whether celebrity or trending entities concentrate reads
- cache effectiveness
- fallback behavior when a shard overloads

Then I would rebalance or redesign the partitioning strategy instead of only scaling the hot shard vertically.

### Question 3

Tell me about a time you changed code to improve product impact, not just engineering cleanliness.

### Answer

Use a STAR structure:

- Situation: the user-facing flow had a real friction point
- Task: reduce drop-off without breaking correctness
- Action: simplify the backend path, reduce dependency hops, add measurements
- Result: improve latency, reduce failure rate, or increase conversion

Meta answers should connect engineering choices to user or product impact.

## Amazon

### What to prepare for

- leadership principles
- STAR stories
- customer-focused design
- scalable systems

### Question 1

Design an order reservation service for a flash sale.

### Answer

The main risks are overselling, timeouts, and inconsistent inventory.

- Keep a clear reservation state machine: pending, confirmed, expired, canceled.
- Use time-bounded reservations so abandoned carts release stock.
- Make the confirm call idempotent.
- Prefer append-only business events for auditability.
- Measure reservation success rate, expiration rate, oversell incidents, and p99 latency.

Amazon answers should show customer impact and operational realism.

### Question 2

Tell me about a time you disagreed with a technical direction.

### Answer

A strong Amazon answer uses a leadership principle without naming it mechanically.

- explain the business risk
- show how you gathered data
- describe how you challenged respectfully
- show what decision was made
- explain the result and what you learned

The best answer sounds like ownership plus judgment, not politics.

### Question 3

Why would you choose asynchronous processing in a Java backend?

### Answer

Only when the business flow allows it.

- good for email sending, report generation, enrichment, analytics
- not good for steps that must finish before the user gets a correct answer

I would choose async to reduce user-facing latency and isolate slow dependencies, but only with good retry, visibility, and idempotency.

## Apple

### What to prepare for

- correctness and polish
- API and platform design
- performance awareness
- privacy and reliability

### Question 1

How do you design a Java API that other teams will use safely?

### Answer

- make the happy path obvious
- keep invalid states hard to construct
- prefer small stable abstractions
- document thread-safety and error behavior clearly
- minimize surprising side effects

The best API is not just powerful. It is hard to misuse.

### Question 2

A backend feature works but is memory-heavy. How would you improve it?

### Answer

Profile before rewriting.

- identify large allocations
- separate temporary object churn from retained memory
- stream or batch data instead of materializing everything
- reduce duplicate data copies
- validate the improvement with measurement

Apple-style answers benefit from discipline and quality focus.

## Netflix

### What to prepare for

- distributed systems
- reliability and observability
- high performance under scale
- engineering judgment

### Question 1

How would you make a billing dependency failure less damaging to signup flow?

### Answer

Start with graceful degradation boundaries.

- isolate billing calls from the rest of the signup flow
- make failures observable and retryable
- protect upstreams with timeouts and circuit breaking
- decide what can be delayed and what must block
- preserve audit events for later recovery

The point is not only resilience. It is controlled resilience.

### Question 2

What metrics matter most for a streaming or large-scale delivery system?

### Answer

- availability
- startup latency
- error rate
- dependency saturation
- retry amplification
- regional imbalance

A Netflix-style answer should sound comfortable with production reality, not just algorithm interviews.

## Coinbase

### What to prepare for

- money correctness
- idempotency
- high-availability systems
- trading or ledger thinking
- security and integrity

### Question 1

How would you design a transfer API so a retry does not move money twice?

### Answer

- require an idempotency key from the caller
- bind that key to the intended transfer request
- persist the result before responding
- return the existing result on duplicate requests
- never rely on client good behavior alone

For money movement, retries are normal. Double movement is unacceptable.

### Question 2

What is more important in a ledger service: availability or correctness?

### Answer

Correctness comes first.
For ledger state, a fast wrong answer is worse than a delayed correct one.

That does not mean ignore availability.
It means:

- isolate ledger truth carefully
- provide safe retries
- expose pending states honestly
- reconcile aggressively

### Question 3

How do you explain eventual consistency to a product team without sounding academic?

### Answer

I would say:

"The system accepted the request, but some downstream views update a little later. The important question is which screen shows source-of-truth data and which screens can safely lag."

That keeps the explanation tied to user behavior, not buzzwords.

## Jane Street

### What to prepare for

- collaborative problem solving
- precise reasoning
- clean code under pressure
- data-structure and algorithm fluency

### Question 1

Maintain the median of a stream of prices. What data structure would you use?

### Answer

Use two heaps.

- max-heap for lower half
- min-heap for upper half
- rebalance after each insert
- median is either one heap top or the average of both tops

The stronger answer also explains invariants clearly.

### Question 2

What makes code quality strong in an interview, beyond passing tests?

### Answer

- names reflect intent
- edge cases are handled explicitly
- invariants are visible
- solution structure is easy to discuss
- tradeoffs are acknowledged

Jane Street signals value in how you think aloud, not just whether you reach the finish line.

### Question 3

If your first idea looks too slow, what do you say?

### Answer

Say it directly.

- explain the brute-force version
- state its complexity
- name the bottleneck
- propose a better structure

Collaborative reasoning is better than silent struggling.

## MakeMyTrip

### What to prepare for

- search and booking flows
- pricing and availability freshness
- caching
- travel-domain scale

### Question 1

How would you design hotel search results caching?

### Answer

- cache the expensive read path
- separate static hotel metadata from fast-changing price and availability
- keep short TTLs for volatile travel data
- invalidate carefully around booking and supplier updates
- measure stale-result incidents, cache hit rate, and search latency

Travel systems punish sloppy caching because stale data becomes a user promise problem.

### Question 2

Why should booking confirmation be idempotent?

### Answer

Because payment retries, client retries, and gateway retries are normal.

- the user should not get multiple bookings
- downstream suppliers should not be called repeatedly without control
- one business action should map to one durable result

### Question 3

How do you handle sudden traffic spikes during holiday sales?

### Answer

- protect critical dependencies
- degrade non-essential features first
- queue or shed low-priority work
- scale read paths and cache aggressively
- keep observability simple enough to trust during incident pressure

## HotelTrader

### What to prepare for

- API design
- GraphQL thinking
- hotel inventory and rate freshness
- onboarding automation
- uptime and partner reliability

### Question 1

How would you model a hotel availability API without over-fetching?

### Answer

This is a good GraphQL-style question.

- expose room, rate, policy, and availability as separate but composable fields
- allow clients to ask for only what they need
- guard expensive joins with careful resolver design
- cache at the right granularity
- watch for N+1 query problems

### Question 2

Why is data freshness so important in hotel distribution?

### Answer

Because stale rates and availability break trust quickly.

- wrong price causes failed booking or margin loss
- wrong availability causes customer frustration
- supplier and buyer relationships degrade when the shelf does not match reality

This is both a business problem and an engineering problem.

### Question 3

What metrics would you watch for a hotel connectivity platform?

### Answer

- uptime
- booking success rate
- rate/availability mismatch rate
- onboarding time
- supplier sync lag
- API latency by partner

For HotelTrader-style systems, operational transparency is part of the product.

## How To Prioritize If You Have Limited Time

### If you want FAANG-style prep

Start with:

1. Google
2. Meta
3. Amazon
4. Apple
5. Netflix

### If you want high-pay quant or fintech style prep

Start with:

1. Jane Street
2. Coinbase
3. then the concurrency and complexity sections of this site

### If you want travel-tech prep

Start with:

1. MakeMyTrip
2. HotelTrader
3. then collections, caching, networking, and exception-handling sections

## Sources

Official pages used to shape these tracks:

- Google interview tips: https://www.google.com/about/careers/applications/interview-tips
- Google technical interview guide: https://services.google.com/fh/files/misc/technical_virtual_interviews_candidate_resource.pdf
- Meta SWE full-loop prep: https://www.metacareers.com/careers/SWE-prep-onsite
- Amazon interviewing at Amazon: https://www.amazon.jobs/en/landing_pages/interviewing-at-amazon
- Amazon how we hire: https://amazon.jobs/content/en/how-we-hire/interviewing-at-amazon
- Jane Street interviewing: https://www.janestreet.com/join-jane-street/interviewing/
- Jane Street mock interview: https://www.janestreet.com/mock-interview
- Netflix engineering careers: https://jobs.netflix.com/careers/engineering
- Netflix new grad guidance: https://jobs.netflix.com/new-grad-program
- Apple staff Java role: https://jobs.apple.com/en-us/details/200597552-0157/staff-software-engineer-information-systems-technology
- Coinbase engineering blog: https://www.coinbase.com/blog/landing/engineering
- Coinbase backend roles: https://www.coinbase.com/careers/positions/7670920
- Coinbase advanced trading backend role: https://www.coinbase.com/careers/positions/7778684
- MakeMyTrip engineering event: https://upfront91.makemytrip.com/
- MakeMyTrip data engineering career playbook: https://careers.makemytrip.com/prod/careerPlaybook/data-engineering
- HotelTrader developer page: https://hoteltrader.com/developer/
- HotelTrader about page: https://hoteltrader.com/about/

Compensation varies by level, location, and market conditions.
The "high-paying" grouping here is an inference from current public market reputation and company tier, not a salary guarantee.
