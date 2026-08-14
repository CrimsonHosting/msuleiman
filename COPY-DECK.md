# COPY DECK — Mohammed Suleiman portfolio

Every piece of visible text on the site, in the order it appears.
**Rewrite the text after each dash. Do not rename the labels** — each one is a real slot in the page,
and the length limits are real (the layout breaks if they are ignored).

### Voice
First person, plain, concrete. No marketing language, no "passionate about", no "leveraging".
Short sentences are fine. Present tense for what is true now, past tense for the summer research.

### Rules
- **All numbers are real. Do not change any of them.** 2,400 robots / 6 hours / 2.4–3.0 kg / 2,114 triangles.
- British spellings are a mistake and should all become American: *randomised→randomized, behaviour→behavior,*
  *centre→center, optimised→optimized, stabilise→stabilize, organised→organized, metre→meter.*
- Keep "Daisy" as the lab robot's name and "Spot" as the Boston Dynamics platform.
- Advisor is Professor Scott Alfeld. School is Amherst College. Graduating 2028.
- Crimson Hosting co-founder is Elliot Scarengos.

---

## PAGE META — invisible, but this is what Google and link previews show

- **Browser tab title** *(max ~60 chars)* — Mohammed Suleiman — Software Engineer
- **Meta description** *(max ~155 chars)* — Computer science and mathematics at Amherst College. Software engineering, machine learning, and robotics research — control systems, reinforcement learning pipelines, and autonomous flight software.

## HEADER — fixed bar at the top

- **Logo text** *(max 4 words)* — M. SULEIMAN / SOFTWARE
- **Nav links** *(1 word each, 5 of them)* — Try it | Research | Projects | About | Contact

---

## HERO — first screen

- **Small label above a block *(2–4 words)*** — Amherst College · Computer Science & Mathematics
- **Hero role line, UPPERCASE *(one line)*** — SOFTWARE ENGINEER — CLASS OF 2028
- **Hero sentence *(1–2 lines MAX — this is the first thing anyone reads)*** — I build software that ships. Web products with paying clients, and control systems for robots.

---

# ▐ CHAPTER 01 — RESEARCH

- **Chapter title** *(ONE word, set huge)* — Research
- **Chapter intro** *(1–2 sentences, sets up everything below it)* — Summer 2026 at Amherst College, advised by Professor Scott Alfeld. Quadruped balance control, reinforcement learning in Isaac Lab, and autonomous flight — ending with a real robot holding itself up on three legs.

---

## 01.1  The three-leg problem

- **Subsection intro *(2–3 sentences)*** — A four-legged robot standing still is balancing over a rectangle drawn between its four feet. Lift one leg and that rectangle becomes a triangle — and if the robot's centre of mass isn't already inside it, the robot falls. That is the whole problem, and solving it on real hardware was the hardest thing I built this summer.
- **Subsection intro *(2–3 sentences)*** — Below is a working model of that robot, seen from its left side, running the same two-link inverse kinematics I wrote for the real one. Drag the body, drag a foot, click a foot to lift it. The readout tells you whether it would actually stay standing — try lifting the front-left leg before shifting the weight, and watch it go red.
- **Button *(1–3 words)*** — Reset stance
- **Button *(1–3 words)*** — Three-leg stand
- **Button *(1–3 words)*** — Two-leg rear
- **Button *(1–3 words)*** — Dance
- **Button *(1–3 words)*** — Show math

---

## 01.2  How it happened

**Legend under the heading** *(3 words each)*
- Decision or blocker
- Worked in simulation
- Worked on the real robot
- Not yet deployed

**The ten steps.** Each is a number, a 2–4 word title, and ONE short sentence.
- `01` **High-level control** — Learned the platform through Spot's high-level API.
- `02` **Low-level ruled out** — Raw joint commands risked breaking the real dog.
- `03` **Simulate first** — Risky motions had to be proven in software first.
- `04` **Blocker: no GPU** — Isaac Sim needed hardware we would have had to rent.
- `05` **Would FrostByte take it?** — Nobody had configured the cluster for Isaac Sim before.
- `06` **I set it up** — Proposed FrostByte, then got Isaac Sim running on it.
- `07` **Three legs in sim** — The simulated Spot held a stable three-leg stance.
- `08` **Sim-to-real pipeline** — A staged path to hardware that could not damage Spot.
- `09` **It worked for real** — The real Spot held the three-leg stance.
- `10` **Two legs in Isaac Lab** — Worked in simulation; summer ended before deployment.

- **Subsection intro *(2–3 sentences)*** — Research reads like a straight line once it is finished. It wasn't. Here is the actual order — including the two points where the project nearly stopped.

---

## 01.3  Quadrupeds

- **Subsection intro *(2–3 sentences)*** — Boston Dynamics Spot, and our lab's unit — Daisy . Two approaches to the same question: can you take a robot built to walk on four legs and make it hold a pose on fewer? One answer was written by hand with classical control. The other was learned.
- **Case-study heading *(2–5 words)*** — Standing on three legs
- **Chips** *(2–3 words each)* — Real hardware | Hardest result | Front-left leg
- **Body paragraph** — No learned policy. No black box. A balance controller written from scratch that shifts the robot's centre of mass into the triangle formed by the three remaining feet, then lifts the front-left foot clear of the ground.
- **Body paragraph** — The hard part isn't the lift — it's everything guarding it. Jacobian-based inverse kinematics maps the desired foot position to joint targets, joint-level control drives them there, and safety gates sit between every stage so a bad state parks the robot rather than dropping it. Getting this off the simulator and onto a machine worth more than a car was the whole summer in one result.
- **List item *(label + one clause)*** — 01 Centre-of-mass shifting — torso repositioned before any leg leaves the ground.
- **List item *(label + one clause)*** — 02 Jacobian IK — foot-space targets resolved into hip, knee, and abduction angles.
- **List item *(label + one clause)*** — 03 Safety gates — limit and stability checks between phases, with an armed recovery pose.
- **List item *(label + one clause)*** — 04 Staged testing — each phase validated in isolation before the next was enabled.
- **Case-study heading *(2–5 words)*** — Three-leg stance in simulation
- **Chips** *(2–3 words each)* — Isaac Sim | Hand-written control
- **Body paragraph** — The same controller, proven in NVIDIA Isaac Sim before it was ever allowed near hardware. Simulation is where the failure modes are cheap: bad gain, wrong sign on a Jacobian, a COM target that puts the robot outside its own support polygon.
- **Body paragraph** — Every behaviour cleared here first. That discipline is what made the sim-to-real transfer survivable on a machine that costs more than a car.
- **Case-study heading *(2–5 words)*** — Balancing on two legs, learned
- **Chips** *(2–3 words each)* — Isaac Lab | Reinforcement learning | Domain randomisation
- **Body paragraph** — Where hand-written control runs out of road, a policy takes over. Spot balancing on its two rear legs isn't something you tune by hand — it's a continuous recovery problem with no stable equilibrium to sit in.
- **Body paragraph** — Trained in Isaac Lab with 2,400 robots stepping in parallel , converging in roughly six hours. Each simulated Spot carried its own randomised payload and its own floor friction, so the policy had to learn to stand under conditions it couldn't predict rather than memorising one perfectly-known robot. It held the two-leg stance in simulation; the summer ended before it reached the real machine, which is what the spring is for.
- **List item *(label + one clause)*** — ENV 2,400 parallel environments · A5000 / A100
- **List item *(label + one clause)*** — WALL ≈6 hours to a deployable policy
- **List item *(label + one clause)*** — RAND Per-robot payload and floor friction, randomised every episode
- **List item *(label + one clause)*** — GOAL Sustained rear-leg balance under unmodelled load
- **List item *(label + one clause)*** — STATE Held in simulation · hardware deployment planned for spring

---

## 01.4  Autonomous flight

- **Subsection intro *(2–3 sentences)*** — A Crazyflie weighs about as much as two sheets of paper, which makes it the ideal thing to throw across a room. Every behaviour below runs onboard — optical flow, Lighthouse localisation, and a multiranger deck feeding decisions made on the drone itself, not on a laptop.
- **Card heading *(2–4 words)*** — Throw to hover
- **Card body *(ONE short line — detail goes in the expanded text)*** — Thrown by hand. It senses free fall, spins up, and catches its own hover.
- **EXPANDED TEXT — shown when the card is clicked *(2 paragraphs)*** — You throw it. Mid-air it works out that it has been thrown, spins up, arrests its own tumble, and settles into a stable hover — no operator input at any point. The interesting failure mode is arming too early. A drone that decides it is flying while still in your hand is a hazard, so detection had to be confident before it was fast . That meant tuning the free-fall threshold against real throws rather than a simulated drop.
- **Card heading *(2–4 words)*** — Ping-pong
- **Card body *(ONE short line — detail goes in the expanded text)*** — Bounces off whatever it detects, on any of four sides. Never settles.
- **EXPANDED TEXT — shown when the card is clicked *(2 paragraphs)*** — The drone flies until the multiranger deck sees something, reverses, and flies until it finds the next thing. It never settles — that is the point. The deck reads all four horizontal directions, so a corner is just two bounces in quick succession. The tuning problem is stopping distance . React too eagerly and it oscillates in place, never committing to a direction. React too late and it taps the wall before it turns. Both failure modes look identical on a plot and completely different in a room.
- **Card heading *(2–4 words)*** — Dodge
- **Card body *(ONE short line — detail goes in the expanded text)*** — Holds a hover and gives ground when something enters its set gap.
- **EXPANDED TEXT — shown when the card is clicked *(2 paragraphs)*** — A hover that defends its own space. The multiranger watches for anything crossing a set gap, and the controller gives ground in proportion to how close it gets — a slow hand pushes it back slowly, a fast one sends it further. Keep advancing and it keeps retreating. Stop, and it settles into a stationary hover rather than drifting on. The gap is a parameter I set per test, not a constant, which is what separates this from ping-pong: dodge wants to stay put, ping-pong never does.
- **Card heading *(2–4 words)*** — Figure eight
- **Card body *(ONE short line — detail goes in the expanded text)*** — A continuous parametric trajectory flown on Lighthouse localisation.
- **EXPANDED TEXT — shown when the card is clicked *(2 paragraphs)*** — A parametric trajectory flown on Lighthouse localisation — continuous, not waypoint to waypoint. This is the control benchmark that everything else sits on top of. The interesting part is the crossover in the middle . That is where the drone is turning hardest while still carrying speed, so position error shows up there first. If the figure eight drifts at the crossover, nothing built on top of it will hold either.
- **Card heading *(2–4 words)*** — Barrel roll
- **Card body *(ONE short line — detail goes in the expanded text)*** — A full commanded roll. Clean flip, rough landing.
- **EXPANDED TEXT — shown when the card is clicked *(2 paragraphs)*** — A full commanded roll about the body axis. The flip itself is clean — you can watch it complete the rotation and come back upright. What follows is not. Recovery needs altitude and open space to re-stabilise, and the test volume had neither: a low ceiling, furniture, and a drone worth more intact than inverted. So this stayed a one-take demonstration rather than something I tuned. An honest result with an obvious next step.
- **Case-study heading *(2–5 words)*** — Keeping them flying
- **Chips** *(2–3 words each)* — 3D printing | Repair
- **Body paragraph** — Research hardware breaks, and a grounded drone stops the week. I sourced and printed replacement motor mounts from existing 3D-printable files, so a downed Crazyflie went back up the same day instead of waiting on a parts order.
- **Body paragraph** — That is the actual STL above, not a picture of one — the mesh is in the page and rendering live. Drag it around.

---

## 01.5  Infrastructure

- **Subsection intro *(2–3 sentences)*** — None of the above trains on a laptop. Getting NVIDIA Isaac Sim and Isaac Lab running on Amherst's FrostByte cluster was its own project — and the write-up that came out of it is the part that outlives me.
- **Case-study heading *(2–5 words)*** — Isaac Sim on a shared cluster
- **Chips** *(2–3 words each)* — Linux | SLURM | Enroot | A5000 / A100
- **Body paragraph** — Isaac Sim expects a workstation with a display attached. A shared HPC cluster gives you neither, and nobody knew whether FrostByte could be made to run it at all. Bridging that meant containerising the runtime with Enroot , requesting GPUs through SLURM , and getting a headless rendering path working end to end. It worked — which meant training on Amherst's own GPUs instead of a cloud bill we couldn't cover .
- **Body paragraph** — Then I wrote it all down. The setup process is documented so the next student gets a working environment on day one instead of losing two weeks to it — which is the only reason any of this scales past one person.
- **Small label above a block *(2–4 words)*** — Working method
- **Tile heading *(2–4 words)*** — Staged testing
- **Body paragraph** — Designed a pipeline where every phase is validated in isolation before the next is enabled. Nothing advances on the real robot until the stage below it is boring.
- **Tile heading *(2–4 words)*** — Sim before steel
- **Body paragraph** — Behaviours cleared Isaac Sim first. Simulation is where a sign error costs a rerun instead of a real robot falling over .
- **Tile heading *(2–4 words)*** — Armed recovery
- **Body paragraph** — A known-stable pose stays armed throughout. Any failed check parks the robot rather than continuing into an unknown state.
- **Tile heading *(2–4 words)*** — Documentation
- **Body paragraph** — Cluster setup, container images, and launch procedure written up so the environment is reproducible by someone who wasn't there .

---

## 01.6  Research poster

- **Subsection intro *(2–3 sentences)*** — The whole summer on one printed board — methods, results, and the failures that shaped both. It was made to be read standing in front of it at full size, so the type is small on a screen: click it to open the full-resolution version , then zoom and pan.
- **Case-study heading *(2–5 words)*** — Summer Undergraduate Research Fellowship
- **Chips** *(2–3 words each)* — Amherst College | Prof. Scott Alfeld | Jun–Aug 2026
- **Body paragraph** — Presented across both platforms: hand-written balance control on Spot and Daisy, a learned rear-leg balance policy trained in Isaac Lab, and the autonomous flight behaviours developed on the Crazyflie.

---

## 01.7  What's next

- **Subsection intro *(2–3 sentences)*** — The summer wasn't the end of this thread — it was the setup.
- **Card heading *(2–4 words)*** — Carrying the Isaac Lab work abroad
- **Body paragraph** — Independent project · Prof. Scott Alfeld
- **Body paragraph** — I'm studying abroad in Budapest this fall and continuing the reinforcement learning work while I'm there — more Isaac Lab, more policy training, run as my own project with my summer advisor Professor Scott Alfeld in the loop. Working a continent away from the robots is exactly why documenting the cluster setup mattered.
- **Card heading *(2–4 words)*** — Deploying those policies on hardware
- **Body paragraph** — Special topics course
- **Body paragraph** — The policies trained abroad come home in the spring and go onto the real robots through a special topics class. Sim-to-real, on work that started as a summer thread and kept going.

---

# ▐ CHAPTER 02 — PROJECTS

- **Chapter title** *(ONE word, set huge)* — Projects
- **Chapter intro** *(1–2 sentences, sets up everything below it)* — What I build outside the lab. A web studio with paying clients, and two hackathon wins.

---

## 02.1  Crimson Hosting

- **Subsection intro *(2–3 sentences)*** — A web studio I co-founded with Elliot Scarengos . We design, build, host, and maintain websites for small businesses on a flat monthly subscription — no agency retainer, no surprise invoices. Real clients, live in production, paying every month.
- **Case-study heading *(2–5 words)*** — What we actually do
- **Body paragraph** — One monthly price covers design, the build, hosting, and everything after it. Most sites are live in weeks rather than months, and we don't close a project until the client is happy with it.
- **List item *(label + one clause)*** — DESIGN Custom and mobile-first — built around the client's brand, not a template swap.
- **List item *(label + one clause)*** — HOST Managed hosting included — keeping the site up is our problem, not theirs.
- **List item *(label + one clause)*** — SPEED Sub-second loads — Core Web Vitals tuned, images served as WebP.
- **List item *(label + one clause)*** — REACH SEO structure — sitemaps, metadata, Google Business Profile setup, analytics.
- **Case-study heading *(2–5 words)*** — Who it’s for
- **Body paragraph** — Small businesses that need a real website and have nobody to run one. Restaurants, churches, local services — owners who want to be found online and do not want to think about hosting, uptime, domains, or updates ever again.
- **Body paragraph** — We take the whole thing off their desk. They approve the design; everything after that is ours. Most of our work comes from people the last client told.
- **List item *(label + one clause)*** — SCOPE Design, build, host, and maintain — one relationship, not four vendors.
- **List item *(label + one clause)*** — PACE Live in weeks, not months. We don’t close a project until the owner is happy.
- **List item *(label + one clause)*** — AFTER Copy changes, new hours, a new menu — they message us, we handle it.
- **Small label above a block *(2–4 words)*** — Client work — drag the divider to compare
- **Card heading *(2–4 words)*** — Creama
- **Body paragraph** — A New Orleans dessert shop. Rebuilt from a cramped, text-heavy page into something that leads with the product.
- **Card heading *(2–4 words)*** — Chilangos
- **Body paragraph** — A Kenner taquería. Menu, hours, and location pulled to the front so people can find what they came for.
- **Card heading *(2–4 words)*** — Joy In Christ Lutheran
- **Body paragraph** — A church with information scattered across a dated layout, reorganised so service times and contact details read clearly.
- **Testimonial *(quote, do not invent — these are real clients)*** — “Crimson Hosting brought my vision to life better than I could have imagined. The site feels premium, effortless, and exactly what I wanted for Creama.” Arwa A. · Creama
- **Testimonial *(quote, do not invent — these are real clients)*** — “I was honestly nervous to preview the website Crimson Hosting made for me but the moment I saw it, I was blown away.” Ashley A. · Chilangos
- **Testimonial *(quote, do not invent — these are real clients)*** — “This is so much better than what we had. The info was displayed clearly and elegantly.” Pastor Julie W. · Joy In Christ

---

## 02.2  Software projects

- **Subsection intro *(2–3 sentences)*** — Two hackathon wins, both software that had to work in front of judges before it had to work well.
- **Card heading *(2–4 words)*** — Mammoth ReServe
- **Body paragraph** — An AI-driven platform connecting campus food surplus with students and local food banks. Dining halls log what's left over; the system routes it to whoever can take it before it's thrown out.
- **Card heading *(2–4 words)*** — SmartCart
- **Body paragraph** — Grocery planning that optimises the whole trip — which stores, in what order, at what total cost — using the Google Maps Places and Gemini APIs to weigh route against price.

---

# ▐ CHAPTER 03 — ABOUT

- **Chapter title** *(ONE word, set huge)* — About
- **Chapter intro** *(1–2 sentences, sets up everything below it)* — Education, experience, and the toolchain.

---

## 03  About me

- **Subsection intro *(2–3 sentences)*** — I’m a computer science and mathematics student at Amherst College, class of 2028. I like problems where the answer has to survive contact with something real — a client who has to run the site after we hand it over, or a robot that falls over if the maths is wrong. Most of what I know I learned by shipping something and then fixing what broke.
- **Small label above a block *(2–4 words)*** — Education & experience
- **Card heading *(2–4 words)*** — B.A. Computer Science & Mathematics
- **Body paragraph** — Amherst College · Amherst, MA · GPA 3.67
- **Body paragraph** — Machine Learning · Artificial Intelligence · Data Structures · Computer Systems · Multivariable Calculus · Mathematical Reasoning
- **Card heading *(2–4 words)*** — Summer Undergraduate Research Fellow
- **Body paragraph** — Amherst College · Robotics & Software Development
- **Body paragraph** — Quadruped control and autonomous flight research under Prof. Scott Alfeld, spanning Boston Dynamics Spot, NVIDIA Isaac Lab, and Crazyflie drones.
- **Card heading *(2–4 words)*** — Postal Clerk
- **Body paragraph** — Amherst College
- **Body paragraph** — Processing and organising packages, assisting students with retrieval.
- **Card heading *(2–4 words)*** — Summerbridge Residential Tutor
- **Body paragraph** — Amherst College
- **Body paragraph** — Mentored first-year students through academic support, study sessions, and residential programming.
- **Card heading *(2–4 words)*** — Freight Coordinator
- **Body paragraph** — A&W Friends Transportation LLC · Remote
- **Body paragraph** — Coordinated dispatching, load booking, and shipment tracking for up to three commercial trucks.
- **Small label above a block *(2–4 words)*** — Toolchain
- **Tile heading *(2–4 words)*** — Languages
- **List item *(label + one clause)*** — Python PRIMARY
- **List item *(label + one clause)*** — Java PRIMARY
- **List item *(label + one clause)*** — Bash TOOLING
- **List item *(label + one clause)*** — R ANALYSIS
- **List item *(label + one clause)*** — Arabic FLUENT
- **Tile heading *(2–4 words)*** — Robotics
- **List item *(label + one clause)*** — NVIDIA Isaac Lab
- **List item *(label + one clause)*** — NVIDIA Isaac Sim
- **List item *(label + one clause)*** — Boston Dynamics Spot SDK
- **List item *(label + one clause)*** — Crazyflie / crazyflie-lib
- **List item *(label + one clause)*** — Lighthouse · Multiranger · AI deck
- **Tile heading *(2–4 words)*** — Concepts
- **List item *(label + one clause)*** — Inverse kinematics
- **List item *(label + one clause)*** — Jacobians
- **List item *(label + one clause)*** — Feedback control
- **List item *(label + one clause)*** — Reinforcement learning
- **List item *(label + one clause)*** — Domain randomisation
- **List item *(label + one clause)*** — Sim-to-real transfer
- **Tile heading *(2–4 words)*** — Systems
- **List item *(label + one clause)*** — Linux
- **List item *(label + one clause)*** — SLURM
- **List item *(label + one clause)*** — Enroot
- **List item *(label + one clause)*** — Git / GitHub
- **List item *(label + one clause)*** — VS Code · IntelliJ

---

## CHAPTER 04 — CONTACT (footer)

- **Small label above a block *(2–4 words)*** — 04 / Contact
- **Big closing line *(3–5 words, breaks over 2 lines)*** — Let’s talk about robots.
- **Body paragraph** — Open to software, machine learning, and robotics internships for summer 2027.
- **Small label above a block *(2–4 words)*** — Direct
- **Small label above a block *(2–4 words)*** — Elsewhere
- **Small label above a block *(2–4 words)*** — Send a message
- **Form field label *(1–2 words)*** — Your name
- **Form placeholder** — Jane Rivera
- **Form field label *(1–2 words)*** — Email
- **Form placeholder** — jane@company.com
- **Form field label *(1–2 words)*** — Message
- **Form placeholder** — What are you working on?
- **Button *(1–3 words)*** — Send message ↗

- **Footer credit line** — Mohammed Suleiman · Amherst College · Class of 2028 SYS · 00:00:00

---

## LABELS ON THE MEDIA FRAMES *(small mono text above each video/photo)*

- `REAL HARDWARE · DAISY`  /  `CAM.01`
- `ISAAC SIM · SPOT`  /  `CAM.02`
- `ISAAC LAB · LEARNED POLICY`  /  `CAM.03`
- `CF21 MOTOR MOUNT · STL`  /  `LIVE MESH · 2,114 TRIANGLES`
- `FROSTBYTE · AMHERST HPC CLUSTER`  /  `ON PREM`
- `POSTER · SUMMER RESEARCH 2026`  /  `CLICK TO ENLARGE ⤢`

## LIVE READOUT UNDER THE INTERACTIVE ROBOT *(2 words max each — these are gauges)*

- Support | Roll | Margin | θ hip FL | θ knee FL | State

## TEXT THAT LIVES IN THE CODE, NOT THE PAGE

**Hint under the robot** — drag the body to shift the centre of mass drag a foot to place it · click a foot to lift it off the ground drag the violet ring to pitch the torso

**Hidden easter egg.** Clicking the FrostByte server photo types out a fake terminal session.
These lines are styled like real `squeue` output — keep the column alignment if you rewrite them:

```
[msuleiman28@frostbyte ~]$ squeue -u msuleiman28
  JOBID PARTITION       NAME     USER ST       TIME  NODES NODELIST
  48812       gpu spot-2leg  msuleim  R    5:51:07      1 gpu-04
  48813       gpu spot-3leg  msuleim PD       0:00      1 (Resources)
  48814     debug   isaac-sh  msuleim  R      12:04      1 gpu-01

[msuleiman28@frostbyte ~]$ scontrol show job 48812 | grep -E 'JobName|RunTime|GRES'
   JobName=spot-2leg-balance
   RunTime=05:51:07 TimeLimit=08:00:00
   GRES=gpu:a100:1

[msuleiman28@frostbyte ~]$ tail -2 logs/48812.out
  [it 4200]  rew 241.8   ep_len 1000   policy saved
  [done] 2,400 robots · one GPU · 5 h 51 m

[msuleiman28@frostbyte ~]$ # nobody had run Isaac Sim on this cluster before.
[msuleiman28@frostbyte ~]$ # now anyone can.

```

**Contact form messages** *(short, plain)*
- Please fill in all three fields.
- That email address looks wrong.
- Sending...
- Sent. I will get back to you.
- Something went wrong. Email me directly.
- Could not send. Email me directly.
- Opening your mail app...

**Dance move names** *(shown under the robot while it dances, 1–2 words, UPPERCASE)*
- WARM UP | SIDE STEP | MARCH | WAVE | REAR UP | BOW | STANCE