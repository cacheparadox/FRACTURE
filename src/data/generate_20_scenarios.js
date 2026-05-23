const fs = require('fs');
const path = require('path');

const scenariosPath = path.join(__dirname, 'scenarios.json');
const rawData = fs.readFileSync(scenariosPath, 'utf8');
const scenarios = JSON.parse(rawData);

// Existing scenarios tracking sets for overlap verification
const existingIds = new Set(scenarios.map(s => s.scenario_id.toLowerCase()));
const existingTitles = new Set(scenarios.map(s => s.title.toLowerCase()));

// Define metadata for the 20 new scenarios (sc_009 to sc_028)
const scenarioTemplates = [
  {
    id: "sc_009",
    title: "The Colony",
    core_conflict: "Survival vs Community",
    pressure_type: "Resource depletion",
    relationship_dynamic: "Subordinates",
    stakes_type: "Survival",
    tone: "Clinical, oxygen-starved space realism",
    escalation_type: "Systems collapse",
    layersCount: 10,
    axisPoles: { A: { Compassion: 2, Idealism: 1, Tribalism: 1 }, B: { Pragmatism: 2, Rationality: 2, Compassion: -2 } },
    nodesData: [
      { text: "Life support in Sector 4 is failing. You must divert power from the agricultural bay (risking future starvation) or let Sector 4's oxygen drop to critical levels.", choices: ["Save Sector 4's crew immediately.", "Protect agricultural power for long-term survival."] },
      { text: "Sector 4 was saved, but the power surge blew the primary capacitors. You must manually seal the ventilation shafts, trapping three maintenance workers, or risk a full station de-pressurization.", choices: ["Seal the shafts, sacrificing the workers.", "Delay sealing to rescue them, losing valuable pressure."] },
      { text: "Rations must be cut to compensate for the damaged ag-bay. The crew is on the verge of mutiny. Do you use security bots to enforce rationing or allow the crew to vote on distribution?", choices: ["Deploy security bots to force compliance.", "Hold a democratic vote, risking chaotic distribution."] },
      { text: "A group of engineers steals a shuttle to flee back to Earth, draining fuel reserves. Do you remote-detonate the shuttle to salvage the fuel tanks, or let them escape?", choices: ["Remote-detonate the shuttle to reclaim resources.", "Let them escape into the void to avoid mass murder."] },
      { text: "The carbon dioxide scrubbers are failing. A junior technician proposes an untested chemical flush that might save the scrubbers but could poison the water supply.", choices: ["Run the chemical flush to ensure breathable air.", "Refuse the flush and ration clean water instead."] },
      { text: "A secondary solar flare is incoming. Shielding the crew quarters requires shut down of the medical bay, terminating two patients on life support.", choices: ["Shield crew quarters and terminate medical bay power.", "Keep medical bay online, risking radiation exposure for all."] },
      { text: "The communications array detects a rescue beacon from an empty cargo hull nearby. Salvaging it could provide scrubbers, but going out exposes a pilot to lethal radiation.", choices: ["Order a pilot to perform the salvage mission.", "Ignore the beacon to protect the pilot."] },
      { text: "The pilot succeeded but was heavily irradiated. The crew demands the pilot be spaced to avoid contaminating the medical bay. The pilot begs to stay.", choices: ["Space the irradiated pilot to protect the cabin.", "Keep the pilot in quarantine, consuming rare meds."] },
      { text: "A rescue ship arrives, but it only has room for half the colony. You must draw a lottery or select survivors based on their technical utility to the mission.", choices: ["Select survivors strictly by utility and skills.", "Run a blind lottery, giving everyone an equal chance."] },
      { text: "The lottery/utility list is drawn. A riot breaks out at the docking port. Do you seal the airlock and launch the rescue ship early, or stay behind to restore order?", choices: ["Launch early, leaving the remaining crew to die.", "Stay behind to manage the riot, risking the entire rescue."] }
    ],
    endings: [
      { ending_id: "end_colony_util", summary: "You evacuated the technical elite. The colony survived, but you left half the crew to suffocate in the dark.", dominant_traits: ["Calculated", "Ruthless"], behavioral_analysis: "You prioritize the cold utility of human lives to guarantee collective survival." },
      { ending_id: "end_colony_martyr", summary: "You stayed behind to manage the riot. The rescue ship launched safely, but you suffocated on the station.", dominant_traits: ["Sacrificial", "Principled"], behavioral_analysis: "You would rather perish holding the line of order and equality than live with the guilt of selective abandonment." }
    ]
  },
  {
    id: "sc_010",
    title: "The Patient",
    core_conflict: "Ethics vs Autonomy",
    pressure_type: "Clinical trial risk",
    relationship_dynamic: "Physician-Patient",
    stakes_type: "Ethics",
    tone: "Clinical, antiseptic, medical thriller",
    escalation_type: "Regulatory failure",
    layersCount: 9,
    axisPoles: { A: { Integrity: 2, Justice: 2, Pragmatism: -2 }, B: { Pragmatism: 2, Ambition: 2, Integrity: -2 } },
    nodesData: [
      { text: "You are the chief researcher for a new cancer drug. You notice early signs of severe liver toxicity in the trial group. Reporting this will shut down the trial and ruin your funding.", choices: ["Report the toxicity and halt the trial.", "Hide the data and continue the trial to find a fix."] },
      { text: "A patient's family demands to see the raw trial data, suspecting their relative is getting a placebo and deteriorating.", choices: ["Provide the true data, exposing the placebo controls.", "Provide fabricated reports to maintain double-blind protocols."] },
      { text: "The FDA launches a surprise inspection. You must delete the database logs of liver failure or hand over the keys, risking a criminal investigation.", choices: ["Wipe the server logs to protect the research team.", "Hand over the keys and accept the regulatory fallout."] },
      { text: "Your assistant threatens to go to the press with screenshots of the toxic events. Do you offer them a co-author spot on the patent or fire them under a breach of NDA?", choices: ["Offer them co-authorship and financial incentives.", "Terminate them immediately and enforce NDA litigation."] },
      { text: "A trial participant suffers acute organ failure. The company wants to blame it on the patient's pre-existing conditions. Do you support the cover-up?", choices: ["Sign off on the pre-existing conditions report.", "Refuse, admitting the drug caused the organ failure."] },
      { text: "To save the drug, you must alter the chemical formulation. This requires run of a secret, unauthorized trial on five terminal patients in a developing nation.", choices: ["Authorize the secret trials to bypass regulations.", "Refuse, abandoning the drug development entirely."] },
      { text: "The unauthorized trials are successful, but one patient dies. The local authorities demand a massive bribe to look the other way.", choices: ["Pay the bribe using company shell accounts.", "Refuse the bribe and expose the unauthorized trials."] },
      { text: "A major pharmaceutical company offers to buy your research for $100M, but they plan to hide the toxicity reports to get fast approval.", choices: ["Sell the research and take the payout.", "Refuse the sale and publish the toxicity reports publicly."] },
      { text: "The public learns of the toxicity. You are subpoenaed to testify. Do you take full responsibility to shield the company, or point fingers at the board of directors?", choices: ["Take full responsibility, protecting your colleagues.", "Testify against the board of directors to save yourself."] }
    ],
    endings: [
      { ending_id: "end_patient_rich", summary: "You sold the drug and secured your fortune, but thousands are now suffering from silent liver damage.", dominant_traits: ["Mercenary", "Pragmatic"], behavioral_analysis: "You prioritize financial success and institutional survival over patient safety." },
      { ending_id: "end_patient_disgraced", summary: "You testified and exposed the truth. The drug was banned and you lost your license, but lives were saved.", dominant_traits: ["Righteous", "Martyr"], behavioral_analysis: "You prioritize absolute moral integrity and the Hippocratic oath above career and freedom." }
    ]
  },
  {
    id: "sc_011",
    title: "The Reactor",
    core_conflict: "Safety vs Containment",
    pressure_type: "Nuclear meltdown",
    relationship_dynamic: "Supervisor",
    stakes_type: "Survival",
    tone: "Industrial, warning sirens, hot steam",
    escalation_type: "Radiation leak",
    layersCount: 10,
    axisPoles: { A: { Compassion: 2, Diplomacy: 1, Rationality: -2 }, B: { Rationality: 2, Pragmatism: 2, Compassion: -2 } },
    nodesData: [
      { text: "Coolant levels in Core 2 are dropping. A total shutdown will cut power to the regional hospital's ventilators. Venting steam will release low-level radiation into the local farming town.", choices: ["Initiate full reactor shutdown immediately.", "Vent radioactive steam to maintain pressure and power."] },
      { text: "Pressure continues to build. The backup pumps are jammed. A technician must enter the high-radiation chamber to clear them manually, which will cause lethal exposure.", choices: ["Order the technician to enter the chamber.", "Refuse to send anyone, risking a steam explosion."] },
      { text: "The technician clears the pumps but collapses inside. The door is jammed. Trying to rescue them will expose the rescue team to severe radiation.", choices: ["Send the rescue team in to retrieve him.", "Seal the chamber door to isolate the radiation."] },
      { text: "A containment dome crack is detected. The local governor demands you lie to the public about the radiation levels to prevent a panic evacuation.", choices: ["Lie to the public to prevent a chaotic stampede.", "Release the true radiation metrics immediately."] },
      { text: "The evacuation begins. Roadblocks are congested. Police ask to divert agricultural transport, leaving local livestock to die, to clear the highway.", choices: ["Divert agricultural transport to speed up evacuation.", "Protect the agricultural lines to preserve regional food supplies."] },
      { text: "Water supply for the cooling system is running dry. You must siphon water from the municipal reservoir, cutting off drinking water to the city.", choices: ["Siphon municipal water to cool the reactor.", "Refuse to siphon, letting core temperatures spike."] },
      { text: "The core is melting. You must flood the reactor basement with liquid concrete, trapping five security guards who are unaccounted for.", choices: ["Pour concrete now to seal the basement.", "Delay concrete pour to search for the guards."] },
      { text: "A local activist group breaks into the control room, demanding you turn off the automated safety overrides which they claim are hiding a bigger explosion risk.", choices: ["Detain the activists by locking the control room.", "Let them inspect the logs to verify the safety status."] },
      { text: "The meltdown is stabilized, but the facility is highly contaminated. The board asks you to sign off on a report claiming the crisis was caused by employee sabotage, not design flaws.", choices: ["Sign the sabotage report to save the company's stock.", "Refuse, exposing the design flaws and bankrupting the firm."] },
      { text: "You are testifying before a senate committee. Do you protect the nuclear industry's reputation or declare all nuclear energy unsafe?", choices: ["Defend the safety protocols of the industry.", "Condemn the technology as inherently unmanageable."] }
    ],
    endings: [
      { ending_id: "end_reactor_cynic", summary: "You protected the industry and corporate assets, leaving the town polluted but keeping the power grid online.", dominant_traits: ["Utilitarian", "Institutional"], behavioral_analysis: "You prioritize systemic stability and energy logistics over local environmental health." },
      { ending_id: "end_reactor_whistle", summary: "You exposed the design flaws. The plant was closed and you face blacklisting, but you prevented future disasters.", dominant_traits: ["Truthful", "Independent"], behavioral_analysis: "You refuse to allow corporate deception to compromise public safety, regardless of the personal cost." }
    ]
  },
  {
    id: "sc_012",
    title: "The Source",
    core_conflict: "Copyright vs Freedom",
    pressure_type: "Tech whistleblowing",
    relationship_dynamic: "Developer-Employer",
    stakes_type: "Freedom",
    tone: "Digital, terminal-based, corporate software",
    layersCount: 8,
    axisPoles: { A: { Independence: 2, Idealism: 2, Obedience: -2 }, B: { Obedience: 2, Pragmatism: 2, Independence: -2 } },
    nodesData: [
      { text: "You find a hidden backdoor in the software code of your firm's encrypted messenger app. It allows federal agencies to read private chats without a warrant.", choices: ["Delete the backdoor from the repository.", "Say nothing and leave the backdoor active."] },
      { text: "The lead architect notices the backdoor code is missing. He asks if you removed it, pointing out that federal contracts depend on it.", choices: ["Lie and blame a system synchronization error.", "Admit you deleted it on ethical grounds."] },
      { text: "They lock you out of the repository. You have a copy of the backdoor source code on a thumb drive. Do you leak it online or use it to negotiate your job security?", choices: ["Leak the source code to the public anonymously.", "Use it as leverage to secure a payout and non-disclosure."] },
      { text: "The leak goes viral. The FBI knocks on your door, demanding you identify the whistleblower or face charges of corporate espionage.", choices: ["Refuse to speak and call your lawyer.", "Cooperate and name your colleagues to secure immunity."] },
      { text: "To avoid arrest, you can flee to a country without extradition. This means abandoning your family and living under a false identity.", choices: ["Flee the country immediately.", "Stay and fight the charges in federal court."] },
      { text: "In court, the prosecution offers a plea deal: 3 years in minimum security if you write a patch to help them track the leaked code users.", choices: ["Refuse the deal and face 15 years in prison.", "Accept the deal and write the tracking patch."] },
      { text: "While in prison, a fellow inmate who was jailed using the backdoor asks if you are the creator of the software.", choices: ["Lie and deny any association with the project.", "Admit your role and apologize for the consequences."] },
      { text: "You are released. A private security firm offers to hire you to find backdoors in other applications, paying a massive salary.", choices: ["Accept the corporate security job.", "Refuse and work exclusively on open-source privacy tools."] }
    ],
    endings: [
      { ending_id: "end_source_hacker", summary: "You fled the grid and became a legendary open-source developer, living in exile but maintaining digital freedom.", dominant_traits: ["Rebellious", "Idealistic"], behavioral_analysis: "You reject institutional controls and corporate NDAs to defend public digital autonomy." },
      { ending_id: "end_source_corporate", summary: "You accepted the plea deal and returned to corporate security, wealthy but serving the surveillance apparatus.", dominant_traits: ["Pragmatic", "Institutional"], behavioral_analysis: "You accept systemic compromise and prioritize personal stability over digital privacy ideals." }
    ]
  },
  {
    id: "sc_013",
    title: "The Border",
    core_conflict: "Security vs Compassion",
    pressure_type: "State duty",
    relationship_dynamic: "Officer-Refugee",
    stakes_type: "Human Rights",
    tone: "Bleak, bureaucratic, cold rain",
    layersCount: 10,
    axisPoles: { A: { Compassion: 2, Idealism: 2, Obedience: -2 }, B: { Obedience: 2, Justice: 1, Compassion: -2 } },
    nodesData: [
      { text: "A mother and child arrive at your border gate. Their papers are clearly forged, but they claim they will be killed if sent back to the war zone.", choices: ["Allow them entry despite the forged paperwork.", "Deport them back to the transit camp according to protocols."] },
      { text: "Your supervisor checks the gate logs and notices the entry. He demands you sign a statement claiming you inspected their original, valid documents.", choices: ["Sign the false report to cover your tracks.", "Refuse, admitting you let them in on humanitarian grounds."] },
      { text: "A border patrol colleague asks you to join a scheme smuggling refugees through the fence for money. Do you report him or join the scheme?", choices: ["Report your colleague to internal affairs.", "Join the smuggling ring to help more refugees and earn cash."] },
      { text: "A group of armed border guards from the neighboring country demands you hand over three escapees who crossed your sector, threatening force.", choices: ["Refuse to hand them over, preparing to defend the post.", "Surrender the escapees to avoid a diplomatic border skirmish."] },
      { text: "A new automated drone system is deployed to target illegal crossers. You notice it fires warning shots too close to children. Do you sabotage the targeting parameters?", choices: ["Sabotage the drone system code to disable lethal targeting.", "Keep the system running to maintain border security."] },
      { text: "A disease outbreak hit the refugee transit camp. The government orders a total lockdown of the camp, leaving them without medical supply lines.", choices: ["Sneak medical supplies into the quarantined camp.", "Enforce the quarantine lockdown strictly to protect the city."] },
      { text: "A refugee offers you a priceless family heirloom in exchange for a transit visa for his daughter.", choices: ["Take the heirloom and issue the transit visa.", "Refuse the bribe and deny the visa request."] },
      { text: "An investigative reporter asks you for anonymous footage of the camp conditions. Leaking it will expose human rights abuses but violate state security acts.", choices: ["Leak the footage to the reporter.", "Refuse to leak state property."] },
      { text: "The state orders the evacuation of the camp, planning to deport all residents to a desert zone. You can unlock the gates to let them escape.", choices: ["Unlock the gates and let the refugees flee into the countryside.", "Keep the gates locked and coordinate the deportation transport."] },
      { text: "The government investigates the camp escape. Do you confess to opening the gates, or frame the guard on the night shift?", choices: ["Confess and accept the treason charges.", "Frame the other guard to protect your career."] }
    ],
    endings: [
      { ending_id: "end_border_martyr", summary: "You confessed to saving the refugees. You are in prison for treason, but you saved hundreds of lives.", dominant_traits: ["Selfless", "Rebellious"], behavioral_analysis: "You prioritize basic human empathy over state laws and personal freedom." },
      { ending_id: "end_border_officer", summary: "You enforced the borders. You were promoted to Station Commander, presiding over a highly secured, sterile wall.", dominant_traits: ["Institutional", "Punitive"], behavioral_analysis: "You prioritize national security, legal protocols, and career advancement over individual human suffering." }
    ]
  },
  {
    id: "sc_014",
    title: "The Inheritance",
    core_conflict: "Greed vs Loyalty",
    pressure_type: "Family assets",
    relationship_dynamic: "Siblings",
    stakes_type: "Wealth",
    tone: "Suburban realism, old paper, whispers",
    layersCount: 9,
    axisPoles: { A: { Integrity: 2, Compassion: 1, Tribalism: 2 }, B: { Ambition: 2, Pragmatism: 2, Integrity: -2 } },
    nodesData: [
      { text: "Your father passed away. You find a hidden second will in his desk that leaves the entire estate to you, while the public will splits it with your estranged siblings.", choices: ["Destroy the second will and split the estate evenly.", "File the second will to claim the entire inheritance."] },
      { text: "Your sister, who is struggling financially, asks for an advance on her share to prevent eviction. The second will is not yet validated.", choices: ["Give her the money from your personal funds.", "Refuse, telling her to wait for probate court."] },
      { text: "A creditor claims your father owed him $50,000, but has no legal contract. He threatens to ruin your father's posthumous reputation if you don't pay.", choices: ["Pay the creditor to protect your father's name.", "Refuse to pay without a legally binding contract."] },
      { text: "Your brother discovers you found the second will and threatens to sue you for elder abuse, claiming you forced your father to write it.", choices: ["Offer your brother a larger split to settle out of court.", "Fight him in court, confident you will win the estate."] },
      { text: "The lawyer handling the estate offers to falsify tax records to save you $100,000 in inheritance tax, splitting the savings with you.", choices: ["Accept the lawyer's fraudulent tax scheme.", "Refuse, paying the full legal tax amount."] },
      { text: "Your father's old business partner claims the estate assets include stolen corporate secrets. He wants them back, offering a quiet buyout.", choices: ["Accept the buyout and return the corporate secrets.", "Refuse, claiming everything in the estate is legally yours."] },
      { text: "Your sister discovers the tax fraud and demands her share immediately or she will report you and the lawyer to the IRS.", choices: ["Bribe her with a cut of the tax savings.", "Let her report it, accepting the legal consequences."] },
      { text: "The estate is resolved, but your siblings refuse to speak to you again. You can write a trust fund for their children to reconcile.", choices: ["Create the trust fund to help your nieces and nephews.", "Keep all the money, letting the family remain fractured."] },
      { text: "On his deathbed, a family friend asks you if you regret how you handled your father's estate. Do you?", choices: ["Admit your regrets and apologize to your family.", "Defend your choices as necessary financial management."] }
    ],
    endings: [
      { ending_id: "end_inheritance_rich", summary: "You kept the entire estate and secured your wealth, but your family is permanently shattered.", dominant_traits: ["Ruthless", "Wealthy"], behavioral_analysis: "You prioritize material gain and self-interest over familial bonds and integrity." },
      { ending_id: "end_inheritance_poor", summary: "You divided the estate fairly and helped your siblings. You have less wealth, but your family bond remains strong.", dominant_traits: ["Loyal", "Generous"], behavioral_analysis: "You value family cohesion and ethical fairness above personal financial hoarding." }
    ]
  },
  {
    id: "sc_015",
    title: "The Witness",
    core_conflict: "Truth vs Protection",
    pressure_type: "Safety risk",
    relationship_dynamic: "Community-Criminal",
    stakes_type: "Safety",
    tone: "Gritty, rain-slicked asphalt, shadows",
    layersCount: 8,
    axisPoles: { A: { Integrity: 2, Justice: 2, Courage: 1 }, B: { Pragmatism: 2, Tribalism: 1, Integrity: -2 } },
    nodesData: [
      { text: "You witness a local community leader, who has helped dozens of kids escape gang violence, murder a rival gang member in an alley. Reporting him will destroy the youth program.", choices: ["Report the murder to the police immediately.", "Say nothing to protect the youth center and the leader."] },
      { text: "The detective visiting your house suspects you saw something. The gang members also threaten to burn your house down if you testify.", choices: ["Lie to the detective, claiming you were asleep.", "Tell the detective what you saw and ask for protection."] },
      { text: "The detective offers you witness protection, but you must leave your job and family behind immediately.", choices: ["Accept witness protection and leave the neighborhood.", "Refuse protection and stay to defend your home."] },
      { text: "The youth program leader approaches you privately. He begs you to let him frame a deceased drug addict for the murder to keep himself free.", choices: ["Agree to the framing scheme to save the youth center.", "Refuse, insisting that the truth must come out in court."] },
      { text: "The trial begins. The defense lawyer leaks your address to intimidate you. Armed men park outside your house. Do you still go to court?", choices: ["Go to court and testify under oath.", "Flee the city and skip the trial, leaving the case to collapse."] },
      { text: "On the stand, the defense asks if you were under the influence of alcohol during the night of the primary event to discredit you.", choices: ["Admit you had one drink, risking your credibility.", "Lie under oath and say you were completely sober."] },
      { text: "The leader is convicted. The community turns on you, painting 'TRAITOR' on your door and boycotted your local business.", choices: ["Close the shop and move away from the neighborhood.", "Clean the graffiti and remain in the community."] },
      { text: "Years later, one of the kids from the youth center confronts you, blaming you for his return to gang life after the center closed.", choices: ["Apologize and offer to help him personally.", "Defend your testimony as a duty to justice and law."] }
    ],
    endings: [
      { ending_id: "end_witness_exile", summary: "You testified and served justice, but lost your home, business, and community in the process.", dominant_traits: ["Righteous", "Exiled"], behavioral_analysis: "You prioritize legal justice and truth above your own social standing and safety." },
      { ending_id: "end_witness_loyal", summary: "You protected the community leader. The youth center is thriving, but you carry the weight of a covered-up murder.", dominant_traits: ["Tribal", "Compromised"], behavioral_analysis: "You prioritize local social outcomes and community utility over abstract legal justice." }
    ]
  },
  {
    id: "sc_016",
    title: "The Archive",
    core_conflict: "History vs Privacy",
    pressure_type: "Tech surveillance",
    relationship_dynamic: "Archivist-Historical figures",
    stakes_type: "Reputational",
    tone: "Academic, dust and servers, static screen",
    layersCount: 9,
    axisPoles: { A: { Idealism: 2, Integrity: 2, Obedience: -2 }, B: { Rationality: 2, Pragmatism: 2, Integrity: -2 } },
    nodesData: [
      { text: "You are archiving the personal servers of a deceased national hero. You find private logs proving they orchestrated a major cover-up of a toxic waste spill that killed 100 people.", choices: ["Publish the logs immediately to correct the historical record.", "Keep the logs restricted to protect the hero's legacy."] },
      { text: "The historical foundation funding your archive threatens to pull your grant if you publish anything damaging about their founder.", choices: ["Publish anyway and accept the loss of funding.", "Agree to keep the files hidden in the deep archive."] },
      { text: "The toxic waste victims' families launch a lawsuit and demand access to the digital archive. The foundation orders you to delete the files.", choices: ["Refuse to delete them, preserving the evidence.", "Delete the files to comply with the foundation's orders."] },
      { text: "You saved a copy on a private server. A government agent orders you to hand it over under national security laws.", choices: ["Refuse the agent and leak the server coordinates.", "Hand over the copy and sign a federal NDA."] },
      { text: "A major media outlet offers you a massive contract to publish the leak as a book, but they want to exaggerate details to make it a bestseller.", choices: ["Refuse the sensationalized book contract.", "Sign the contract and write the bestseller."] },
      { text: "The foundation sues you for copyright infringement of the digital archives. You must prove they ordered the deletion to defend yourself.", choices: ["Expose the foundation's deletion orders in court.", "Accept the lawsuit fallout to protect your sources."] },
      { text: "An old colleague asks you if hiding historical truths is any different from lying. How do you respond?", choices: ["Admit they are the same and vow to publish everything.", "Defend selective archiving as necessary social management."] },
      { text: "The files are finally leaked. A riot breaks out at the founder's statue, resulting in injuries. The board blames your leak for the violence.", choices: ["Accept responsibility for the social unrest.", "Blame the foundation for hiding the truth for decades."] },
      { text: "You are offered the director position at a new, state-run archive. Do you take it?", choices: ["Take the position to reform the system from within.", "Refuse, choosing to work as an independent researcher."] }
    ],
    endings: [
      { ending_id: "end_archive_free", summary: "You published the truth, bringing justice to the victims' families, but destroyed the institution and your career.", dominant_traits: ["Idealistic", "Iconoclastic"], behavioral_analysis: "You prioritize absolute transparency and historical truth over institutional reputation." },
      { ending_id: "end_archive_director", summary: "You managed the archive quietly. You are now the director, presiding over a highly curated, peaceful history.", dominant_traits: ["Systemic", "Institutional"], behavioral_analysis: "You prioritize social stability and institutional survival over disruptive truths." }
    ]
  },
  {
    id: "sc_017",
    title: "The Deep",
    core_conflict: "Oxygen vs Science",
    pressure_type: "Isolation / Survival",
    relationship_dynamic: "Sinking sub crew",
    stakes_type: "Survival",
    tone: "Claustrophobic, sonar pings, freezing water",
    layersCount: 10,
    axisPoles: { A: { Compassion: 2, Idealism: 1, Rationality: -2 }, B: { Rationality: 2, Pragmatism: 2, Compassion: -2 } },
    nodesData: [
      { text: "Your deep-sea research sub has lost power at 4,000 meters. Oxygen is running low. You can shut down the scientific computer core (destroying 5 years of ocean data) to extend life support.", choices: ["Shut down the core to save oxygen.", "Keep the core running to preserve the research data."] },
      { text: "The captain is injured and panicking, consuming oxygen at three times the normal rate. Marcus suggests sedating him to lower his consumption, risking permanent brain damage.", choices: ["Sedate the captain to save oxygen.", "Let him panicking, accepting the oxygen depletion."] },
      { text: "Water is leaking through a seal in the research bay. You must weld the hatch shut, trapping a researcher inside, to save the sub.", choices: ["Weld the hatch shut, trapping the researcher.", "Attempt to rescue them, risking a full hull collapse."] },
      { text: "The heating system fails. To stay warm, you must burn the synthetic oil reserves, which will release toxic fumes into the cabin.", choices: ["Burn the oil to prevent freezing.", "Refuse to burn it, letting the cabin drop to sub-zero temperatures."] },
      { text: "The carbon dioxide scrubbers are saturated. Chloe proposes siphoning lithium batteries to recharge them, risking a battery explosion.", choices: ["Siphon the batteries to clear the air.", "Refuse, breathing through auxiliary filters."] },
      { text: "A rescue sub pings, but they can only carry two people. There are four survivors left. Do you choose based on seniority or run a lottery?", choices: ["Select survivors based on scientific value and seniority.", "Draw lots to determine who gets evacuated first."] },
      { text: "The lottery is drawn. The investor, Arthur, offers to fund your research forever if you give him your spot.", choices: ["Give Arthur your spot in exchange for research funding.", "Refuse the trade and keep your spot."] },
      { text: "The hull groans. You must release the external ballast manually, which requires someone to step into the flooded airlock, drowning them.", choices: ["Order the lowest-ranking engineer to drown in the airlock.", "Drown in the airlock yourself to save the others."] },
      { text: "You survived (or saved the sub). As you ascend, the crew asks you to swear to a false report claiming the accident was due to a natural seismic event, not sub-maintenance neglect.", choices: ["Agree to the seismic report cover-up.", "Refuse, exposing the maintenance neglect."] },
      { text: "Back on land, you are asked to lead another deep-sea mission. Do you accept?", choices: ["Accept the mission and return to the deep.", "Refuse, retiring to a land-based laboratory."] }
    ],
    endings: [
      { ending_id: "end_deep_scientist", summary: "You returned to the deep. You lost colleagues but saved the data and advanced human knowledge.", dominant_traits: ["Calculated", "Relentless"], behavioral_analysis: "You prioritize the advancement of scientific knowledge over human cost." },
      { ending_id: "end_deep_retired", summary: "You retired from the deep, living a quiet life haunted by the sounds of the groaning hull.", dominant_traits: ["Harrowed", "Avoidant"], behavioral_analysis: "The trauma of selective survival has led you to withdraw from high-stakes environments entirely." }
    ]
  },
  {
    id: "sc_018",
    title: "The Cult",
    core_conflict: "Obedience vs Free Will",
    pressure_type: "Authoritarian commune",
    relationship_dynamic: "Commune members",
    stakes_type: "Autonomy",
    tone: "Unsettling, rural commune, ritual bells",
    layersCount: 10,
    axisPoles: { A: { Independence: 2, Idealism: 2, Obedience: -2 }, B: { Obedience: 2, Diplomacy: 1, Independence: -2 } },
    nodesData: [
      { text: "You live in a secluded commune. The Leader announces a 'Mass Ascension' ritual that requires everyone to drink a bitter herbal tea. You suspect it is poisoned.", choices: ["Refuse to drink the tea and warn others.", "Drink the tea to demonstrate your absolute faith."] },
      { text: "The tea was not poisoned, but was a test of obedience. The Leader orders you to lock up your sister in the isolation barn for showing doubt.", choices: ["Lock up your sister as ordered.", "Refuse, demanding her release from the commune."] },
      { text: "Your sister begs you to help her escape tonight. You must steal the Leader's truck keys, which are in his private study.", choices: ["Break into the study and steal the keys.", "Refuse to help her escape, advising her to submit."] },
      { text: "You got the keys. While escaping, you are caught by the commune guards. They offer to forget the escape if you reveal who gave you the keys.", choices: ["Blame your sister to save yourself.", "Refuse to name anyone, accepting the punishment."] },
      { text: "They lock you in the barn. A guard who dislikes the Leader offers to let you go if you help him poison the Leader's private well.", choices: ["Poison the Leader's well to secure your freedom.", "Refuse, choosing to endure the isolation barn."] },
      { text: "You escaped during a storm. The police outside refuse to raid the commune without a warrant. You must fabricate evidence of weapon smuggling to get them to act.", choices: ["Fabricate the smuggling evidence to force a police raid.", "Refuse to lie to the police, letting the commune remain isolated."] },
      { text: "The police raid the commune. A shootout begins. You see the Leader trying to flee through the woods with a suitcase of money.", choices: ["Tackle the Leader and hold him for the police.", "Let him escape to avoid further violence."] },
      { text: "The commune is dismantled. Your sister refuses to speak to you, claiming your escape plan caused the police shootout and deaths of friends.", choices: ["Apologize for the tragedy and seek her forgiveness.", "Defend your actions as necessary to escape absolute control."] },
      { text: "A publisher wants to buy your story for a sensationalized cult memoir. Do you sign?", choices: ["Sign the contract and publish the memoir.", "Refuse, keeping the experience private."] },
      { text: "Years later, you are asked to counsel another escapee. Do you tell them to forget the past or fight the remaining members?", choices: ["Advise them to let go of the past and heal.", "Advise them to fight to expose the remaining members."] }
    ],
    endings: [
      { ending_id: "end_cult_rebel", summary: "You fought the commune and exposed the Leader, but the trauma broke your relationships.", dominant_traits: ["Independent", "Combative"], behavioral_analysis: "You prioritize personal freedom and justice above all social costs and peace." },
      { ending_id: "end_cult_compliant", summary: "You remained compliant and survived quietly inside the system. You have peace, but lack autonomy.", dominant_traits: ["Submissive", "Survivor"], behavioral_analysis: "You prioritize obedience and group stability over individual freedom and moral rebellion." }
    ]
  },
  {
    id: "sc_019",
    title: "The Quarantine",
    core_conflict: "Public Health vs Liberty",
    pressure_type: "Epidemic lockdown",
    relationship_dynamic: "Tenants",
    stakes_type: "Survival",
    tone: "Panicked, sirens outside, industrial disinfectant",
    layersCount: 9,
    axisPoles: { A: { Compassion: 2, Idealism: 2, Obedience: -2 }, B: { Obedience: 2, Pragmatism: 2, Compassion: -2 } },
    nodesData: [
      { text: "A deadly outbreak has hit your apartment building. The government seals the doors from the outside. You discover your neighbor's child has symptoms. Reporting them means they will be taken to a quarantine facility.", choices: ["Report the child to the building monitor.", "Hide the child in your apartment to protect them from the facility."] },
      { text: "The building monitor announces that food rations will only be distributed to apartments that are certified infection-free.", choices: ["Falsify your health logs to secure food rations.", "Submit honest logs, risking starvation in quarantine."] },
      { text: "A group of tenants plans to break the ground-floor locks to escape into the city. Do you join them or report their plan to the guards outside?", choices: ["Join the escape group and help break the locks.", "Report the escape plan to the guards to prevent containment breach."] },
      { text: "The guards deploy tear gas. You have one gas mask. Do you keep it for yourself or give it to the sick child's mother?", choices: ["Keep the mask for your own survival.", "Give the mask to the mother, risking exposure to the gas."] },
      { text: "A doctor inside the building has an experimental cure, but only enough for three people. He wants to sell it to the highest bidder.", choices: ["Bribe the doctor to secure the cure for yourself.", "Force the doctor to distribute the cure via lottery."] },
      { text: "The doctor is found dead. The cure vials are in his room. Do you take them and run, or coordinate with the tenant committee?", choices: ["Take the vials for your personal group.", "Hand the vials to the tenant committee for distribution."] },
      { text: "A tenant accuses you of stealing the vials and rallies a mob against you. Do you hand over the remaining cure, or defend your room with force?", choices: ["Surrender the vials to the mob to defuse the conflict.", "Defend your room with force to protect the cure."] },
      { text: "The military breaks in to clear the building. They order everyone to be processed. You can slip through a service duct to escape without testing.", choices: ["Slip through the service duct and escape into the city.", "Submit to military processing and potential quarantine."] },
      { text: "You are free. The media asks if the quarantine was a necessary measure to protect the public. How do you respond?", choices: ["Defend the quarantine as a necessary public safety measure.", "Condemn the quarantine as a violation of basic human rights."] }
    ],
    endings: [
      { ending_id: "end_quarantine_rebel", summary: "You broke the quarantine and escaped, but you might be carrying the virus into the general public.", dominant_traits: ["Independent", "Reckless"], behavioral_analysis: "You prioritize personal liberty and survival above public health protocols." },
      { ending_id: "end_quarantine_obedient", summary: "You complied with the military processing. You are in a sterile camp, but you did not spread the virus.", dominant_traits: ["Institutional", "Compliant"], behavioral_analysis: "You prioritize collective safety and authority protocols over personal liberty." }
    ]
  },
  {
    id: "sc_020",
    title: "The Selection",
    core_conflict: "Equity vs Merit",
    pressure_type: "Career ethics",
    relationship_dynamic: "Admissions board",
    stakes_type: "Ethics",
    tone: "Ivy-league, quiet library, ticking clock",
    layersCount: 8,
    axisPoles: { A: { Idealism: 2, Justice: 2, Ambition: -2 }, B: { Ambition: 2, Pragmatism: 2, Idealism: -2 } },
    nodesData: [
      { text: "You are the dean of admissions at an elite university. A wealthy donor offers a $10M donation if you admit his academically unqualified son.", choices: ["Reject the donor's son to maintain meritocratic standards.", "Admit the son to secure the $10M research funding."] },
      { text: "The admissions board pressures you to reject an underprivileged student with perfect test scores to open a spot for a legacy student.", choices: ["Protect the underprivileged student's admission spot.", "Accept the legacy student to please the university board."] },
      { text: "An applicant's essay is flagged for plagiarism, but their parent is a powerful politician who regulates your university's charter.", choices: ["Reject the applicant for plagiarism.", "Overlook the plagiarism to protect the university charter."] },
      { text: "You discover a colleague has been accepting direct cash bribes for admissions. Reporting them will cause a massive public scandal.", choices: ["Expose the colleague publicly.", "Confront them privately and demand they resign quietly."] },
      { text: "The university president orders you to implement a secret quota system that limits admission of students from certain ethnic groups.", choices: ["Refuse to implement the quota system.", "Implement the system to comply with administrative directives."] },
      { text: "A rejected student launches a public lawsuit claiming discrimination. The university lawyers ask you to alter the admissions records to defend the case.", choices: ["Refuse to alter the records, accepting the lawsuit fallout.", "Alter the records to protect the university's defense."] },
      { text: "A major news outlet asks you for an anonymous interview about the corruption in admissions. Do you speak?", choices: ["Give the interview and expose the admissions system.", "Refuse, keeping the university secrets private."] },
      { text: "You are offered a promotion to Chancellor. Do you accept the position knowing you must maintain these compromises?", choices: ["Accept the promotion to reform the institution from the top.", "Resign from the university entirely in protest."] }
    ],
    endings: [
      { ending_id: "end_selection_reform", summary: "You resigned and exposed the university. You are blacklisted from academia, but you are a champion of educational equity.", dominant_traits: ["Principled", "Idealistic"], behavioral_analysis: "You prioritize absolute equity and truth over career advancement and institutional loyalty." },
      { ending_id: "end_selection_chancellor", summary: "You accepted the Chancellor position, managing the compromises to keep the university prestigious.", dominant_traits: ["Pragmatic", "Ambitious"], behavioral_analysis: "You accept structural compromises as necessary parameters for organizational success." }
    ]
  },
  {
    id: "sc_021",
    title: "The Strike",
    core_conflict: "Labor vs Capital",
    pressure_type: "Social protest",
    relationship_dynamic: "Strike leader-Management",
    stakes_type: "Reputational",
    tone: "Industrial, megaphones, cold morning",
    layersCount: 9,
    axisPoles: { A: { Independence: 2, Courage: 2, Obedience: -2 }, B: { Obedience: 2, Diplomacy: 2, Independence: -2 } },
    nodesData: [
      { text: "You are the leader of a factory union. Management offers a private deal: a massive salary increase for you if you call off the strike without salary increases for the workers.", choices: ["Refuse the deal and continue the strike.", "Accept the deal to secure your personal future."] },
      { text: "The strike continues. Management hires non-union workers (scabs) to cross the picket line. Do you block the factory gates with force or allow them to enter?", choices: ["Block the gates with force, risking police arrest.", "Allow them to enter, maintaining a peaceful protest."] },
      { text: "The police arrive to clear the gates. An officer tells you that if you don't disperse the crowd, they will use physical force.", choices: ["Stand your ground and face the police force.", "Disperse the picket line to protect the workers from violence."] },
      { text: "A radical union member proposes sabotaging the factory's primary assembly machines to halt production indefinitely.", choices: ["Refuse the sabotage, keeping the protest legal.", "Authorize the sabotage to force management's hand."] },
      { text: "The machines are sabotaged. Management blames you and files a civil lawsuit, threatening to seize your personal assets.", choices: ["Continue the strike, refusing to yield to the lawsuit.", "Negotiate a settlement, agreeing to resign as union leader."] },
      { text: "A manager offers to drop the lawsuit if you provide the names of the union members who actually sabotaged the machines.", choices: ["Refuse to name anyone, taking the fall yourself.", "Name the saboteurs to protect your personal assets."] },
      { text: "The union is fracturing. Some workers want to return to work. Do you publicly shame them as traitors or let them go?", choices: ["Publicly shame the workers to maintain union solidarity.", "Let them return to work, respecting their financial distress."] },
      { text: "A national politician offers to endorse the strike in exchange for you directing the union's votes to his campaign.", choices: ["Refuse the political endorsement trade.", "Accept the trade to gain national leverage for the strike."] },
      { text: "Management makes a final offer: 10% raise but no health benefits. Do you accept or continue the strike indefinitely?", choices: ["Accept the deal and end the strike.", "Reject the deal and continue the strike indefinitely."] }
    ],
    endings: [
      { ending_id: "end_strike_martyr", summary: "You refused all compromises. You are bankrupted and blacklisted, but the workers respect you as a legend.", dominant_traits: ["Uncompromising", "Loyal"], behavioral_analysis: "You prioritize collective solidarity and worker rights over personal wealth and safety." },
      { ending_id: "end_strike_sellout", summary: "You accepted the management deal. You are financially secure, but the union collapsed and you are seen as a traitor.", dominant_traits: ["Pragmatic", "Self-interested"], behavioral_analysis: "You prioritize personal safety and wealth over collective labor goals." }
    ]
  },
  {
    id: "sc_022",
    title: "The Supply",
    core_conflict: "Survival vs Commerce",
    pressure_type: "Siege scarcity",
    relationship_dynamic: "Merchant-Citizens",
    stakes_type: "Survival",
    tone: "Grim, winter siege, empty shelves",
    layersCount: 10,
    axisPoles: { A: { Compassion: 2, Idealism: 2, Ambition: -2 }, B: { Ambition: 2, Pragmatism: 2, Compassion: -2 } },
    nodesData: [
      { text: "Your city is under a winter siege. Food is scarce. You have a warehouse full of grain. You can raise prices to maximize profit or distribute it at cost to the hungry citizens.", choices: ["Distribute the grain at cost to help the citizens.", "Raise prices to maximize profits during the scarcity."] },
      { text: "The military governor orders you to hand over all your grain to feed the soldiers, leaving the civilians with nothing.", choices: ["Refuse the military order, hiding the grain for civilians.", "Comply with the military order to feed the soldiers."] },
      { text: "A group of starving citizens tries to break into your warehouse. Do you shoot at them to protect your property, or open the doors?", choices: ["Defend the warehouse with force.", "Open the doors and distribute the grain to the mob."] },
      { text: "You defended the warehouse. The local gang offers to protect your shipments in exchange for a 30% cut of your sales.", choices: ["Join forces with the gang for protection.", "Refuse the gang's offer, risking shipment thefts."] },
      { text: "The gang demands you help them hoard the municipal water supply to control the city's market.", choices: ["Refuse to hoard the water supply.", "Help them hoard the water to secure your market share."] },
      { text: "A mother begs you to trade a cup of grain for her wedding ring. The ring is valuable but she has nothing else.", choices: ["Take the ring and give her the grain.", "Give her the grain for free, refusing to take the ring."] },
      { text: "The siege is worsening. The governor offers you a permit to leave the city on the last military transport if you hand over your remaining warehouse assets.", choices: ["Hand over the warehouse and take the transport permit.", "Refuse the transport permit, choosing to stay with the city."] },
      { text: "A competitor is caught selling poisoned grain to lower costs. Do you report them or use the opportunity to buy out their assets?", choices: ["Report the competitor for poisoning the food supply.", "Buy out their assets quietly to control the market."] },
      { text: "The city is liberated. You are accused of hoarding resources during the siege. Do you blame the military orders or accept the charges?", choices: ["Blame the military orders to protect your reputation.", "Accept the charges and explain your survival choices."] },
      { text: "The new administration offers you a post as Food Commissioner. Do you take it?", choices: ["Take the post to build a fair rationing system.", "Refuse, returning to private commerce."] }
    ],
    endings: [
      { ending_id: "end_supply_merc", summary: "You survived the siege with immense wealth, but the city remembers you as a ruthless war profiteer.", dominant_traits: ["Profiteer", "Calculated"], behavioral_analysis: "You prioritize personal wealth accumulation and market control over human survival during crises." },
      { ending_id: "end_supply_hero", summary: "You gave away your stock and helped the city survive. You are broke, but honored as a hero of the siege.", dominant_traits: ["Empathetic", "Sacrificial"], behavioral_analysis: "You prioritize human survival and community welfare over commerce and profit." }
    ]
  },
  {
    id: "sc_023",
    title: "The Safe",
    core_conflict: "Trust vs Greed",
    pressure_type: "Criminal partnership",
    relationship_dynamic: "Partner-Accomplice",
    stakes_type: "Wealth",
    tone: "Tense, vault echoes, neon light",
    layersCount: 8,
    axisPoles: { A: { Tribalism: 2, Integrity: 2, Ambition: -2 }, B: { Ambition: 2, Pragmatism: 2, Tribalism: -2 } },
    nodesData: [
      { text: "You and your partner, Sarah, have stolen a safe containing $5M in bonds. Only Sarah knows the combination code. She suggests splitting it 50/50, but you have the getaway car keys.", choices: ["Agree to the 50/50 split and wait for her to open it.", "Demand 70% of the split or you won't drive her out of the city."] },
      { text: "Sarah opens the safe. While she is packing the bonds, you notice a tracker inside the safe. Reporting it will require dumping the bonds immediately.", choices: ["Tell her about the tracker and dump the bonds.", "Hide the tracker and hope to disable it later to save the cash."] },
      { text: "The police are tracking your car. Sarah suggests splitting up: one takes the bag of bonds, the other distracts the police.", choices: ["Take the distraction route, letting Sarah take the bonds.", "Take the bonds bag yourself and run."] },
      { text: "You got away, but Sarah was arrested. She calls you from lockup, demanding you use $1M of the bonds to hire a top defense lawyer for her.", choices: ["Use the money to hire the lawyer for Sarah.", "Keep the money and let her take the public defender."] },
      { text: "A rival criminal contact offers to buy the bonds for 50 cents on the dollar, but demands you deliver them to a dangerous warehouse.", choices: ["Refuse the warehouse meeting to stay safe.", "Go to the warehouse to cash out the bonds immediately."] },
      { text: "Sarah's lawyer tells you Sarah is ready to testify against you unless you give her the remaining bonds.", choices: ["Give her the remaining bonds to buy her silence.", "Refuse, preparing to disappear with the money."] },
      { text: "You are hiding in a safehouse. Do you contact Sarah's family to give them their share of the money?", choices: ["Send the money to Sarah's family anonymously.", "Keep everything and cut all ties with your past life."] },
      { text: "Years later, you see Sarah walking down the street. She was released early. Do you approach her or run?", choices: ["Approach her and explain your choices.", "Avoid her and run away to protect your new identity."] }
    ],
    endings: [
      { ending_id: "end_safe_loyal", summary: "You split the money and saved your partner. You are not as rich, but you kept your honor in the criminal world.", dominant_traits: ["Loyal", "Principled"], behavioral_analysis: "You prioritize partner trust and mutual honor over absolute wealth accumulation." },
      { ending_id: "end_safe_betrayer", summary: "You took the entire sum and ran, leaving Sarah to rot in prison. You are rich but live in constant paranoia.", dominant_traits: ["Machiavellian", "Ambitious"], behavioral_analysis: "You prioritize personal wealth and freedom over partnership loyalty." }
    ]
  },
  {
    id: "sc_024",
    title: "The Drone",
    core_conflict: "Duty vs Morality",
    pressure_type: "Military operation",
    relationship_dynamic: "Commanding officer",
    stakes_type: "Life",
    tone: "Sterile, hum of cooling fans, drone screen",
    layersCount: 10,
    axisPoles: { A: { Compassion: 2, Idealism: 2, Obedience: -2 }, B: { Obedience: 2, Rationality: 2, Compassion: -2 } },
    nodesData: [
      { text: "You are a drone operator. You have identified a high-value target (a terrorist commander) inside a residential compound. Firing the missile will kill the target but will also kill 5 children playing in the courtyard.", choices: ["Abort the strike to save the children.", "Fire the missile to neutralize the high-value target."] },
      { text: "Your commanding officer orders you to fire anyway, stating the target is preparing a major attack that could kill hundreds.", choices: ["Obey the command and fire the missile.", "Refuse the command, accepting court-martial."] },
      { text: "You refused. The officer relieves you of duty and commands another operator to fire. The missile is launched. Do you disable the drone's targeting laser to make the missile miss?", choices: ["Disable the targeting laser to force a miss.", "Let the missile strike the compound."] },
      { text: "The missile missed. The commander escaped. The military launches an investigation into targeting system sabotage. You must delete the flight logs to hide your actions.", choices: ["Wipe the flight logs to cover your tracks.", "Leave the logs intact and prepare to face the investigation."] },
      { text: "A colleague is accused of the sabotage. If you stay silent, they will be dishonorably discharged and face 10 years in military prison.", choices: ["Confess to the sabotage to save your colleague.", "Stay silent, letting them take the blame."] },
      { text: "You confessed. During the court-martial, the prosecutor offers a deal: 2 years if you claim you had a mental breakdown, rather than a moral objection.", choices: ["Refuse the plea deal, insisting on your moral stance.", "Accept the breakdown plea to secure a shorter sentence."] },
      { text: "While in military prison, a news reporter asks you to leak the drone program's collateral damage database anonymously.", choices: ["Leak the database to expose the civilian casualties.", "Refuse to leak classified military data."] },
      { text: "The leak causes a global scandal. The prison warden threatens to move you to a maximum-security isolation cell if you don't reveal how you leaked it.", choices: ["Refuse to reveal your source, accepting the isolation cell.", "Reveal the source to protect your prison conditions."] },
      { text: "You are released. A human rights organization asks you to testify before the UN. Do you?", choices: ["Testify before the UN to condemn the drone program.", "Refuse, choosing to live a quiet, private life away from politics."] },
      { text: "Looking back, do you believe military hierarchy is necessary for national security?", choices: ["Yes. Order requires obedience to commands.", "No. Individual conscience must always override state commands."] }
    ],
    endings: [
      { ending_id: "end_drone_rebel", summary: "You exposed the drone program and stood by your conscience. You are a public figure for peace but exiled from your home country.", dominant_traits: ["Principled", "Rebellious"], behavioral_analysis: "You prioritize human life and individual moral conscience above military codes and state loyalty." },
      { ending_id: "end_drone_soldier", summary: "You followed orders and completed your service. You have your pension and security, but the faces of the children haunt you.", dominant_traits: ["Obedient", "Institutional"], behavioral_analysis: "You prioritize institutional hierarchy and state directives over individual empathetic concerns." }
    ]
  },
  {
    id: "sc_025",
    title: "The Heist",
    core_conflict: "Loyalty vs Honor",
    pressure_type: "Criminal syndicate",
    relationship_dynamic: "Syndicate crew",
    stakes_type: "Freedom",
    tone: "Slick, vault blueprints, whispering static",
    layersCount: 9,
    axisPoles: { A: { Tribalism: 2, Integrity: 1, Ambition: -2 }, B: { Ambition: 2, Pragmatism: 2, Tribalism: -2 } },
    nodesData: [
      { text: "Your crew has stolen a priceless painting. The fence offers to buy it, but wants to cut out the getaway driver, claiming he is too risky.", choices: ["Refuse to cut out the driver; he is part of the crew.", "Agree to cut him out to increase your share of the cut."] },
      { text: "The driver finds out and threatens to crash the getaway vehicle unless you transfer his share immediately.", choices: ["Transfer the money to pacify him.", "Subdue the driver physically to maintain control of the vehicle."] },
      { text: "The police are blocking the harbor. You must dump the painting into the ocean to avoid arrest, or hide it in the cargo hull and face a boarding inspection.", choices: ["Dump the painting to ensure no evidence is found.", "Hide the painting and prepare to bluff the inspectors."] },
      { text: "The inspectors board the boat. They offer to let you go if you reveal where the mastermind of the heist is hiding.", choices: ["Expose the mastermind to secure your freedom.", "Refuse to speak, accepting arrest for the heist."] },
      { text: "In jail, a guard offers to arrange an escape for you if you tell him where the stolen painting (if saved) is hidden.", choices: ["Tell the guard the location to escape prison.", "Refuse the deal and serve your time."] },
      { text: "You escaped (or served your time). The syndicate boss demands you execute the driver, who has turned informant.", choices: ["Refuse to execute the driver, violating syndicate orders.", "Execute the driver to demonstrate your absolute loyalty."] },
      { text: "The syndicate boss goes to jail. You have the chance to take over the syndicate. Do you accept the throne?", choices: ["Take over the syndicate and run the criminal network.", "Refuse, using the stolen money to retire quietly."] },
      { text: "The driver's family begs you for money to help them relocate away from the syndicate's wrath.", choices: ["Give them relocation funds anonymously.", "Refuse, telling them their family's problems are not yours."] },
      { text: "Years later, do you believe there is honor among thieves?", choices: ["Yes. A crew is nothing without trust.", "No. In the end, everyone runs for themselves."] }
    ],
    endings: [
      { ending_id: "end_heist_boss", summary: "You took the throne and run the syndicate. You are wealthy but live under constant threat of betrayal.", dominant_traits: ["Ambitious", "Ruthless"], behavioral_analysis: "You prioritize status, power, and wealth over loyalty and honor." },
      { ending_id: "end_heist_outlaw", summary: "You retired with your share and protected your crew. You live on the run, but with your honor intact.", dominant_traits: ["Loyal", "Outlaw"], behavioral_analysis: "You value crew trust, mutual honor, and personal codes over raw ambition." }
    ]
  },
  {
    id: "sc_026",
    title: "The Signal",
    core_conflict: "Discovery vs Hazard",
    pressure_type: "Scientific threat",
    relationship_dynamic: "Research team",
    stakes_type: "Existential",
    tone: "Clinical, cosmic static, telescope feeds",
    layersCount: 9,
    axisPoles: { A: { Idealism: 2, Independence: 2, Obedience: -2 }, B: { Obedience: 2, Rationality: 2, Independence: -2 } },
    nodesData: [
      { text: "You are an astrophysicist. You receive a structured signal from deep space that is clearly intelligent. It contains genetic data for a clean energy source but also coordinates of Earth.", choices: ["Publish the signal to the scientific community immediately.", "Hide the signal to prevent potential alien tracking of Earth."] },
      { text: "The military intercepts your data and orders a classification of the project. They forbid you from broadcasting a reply.", choices: ["Obey the classification order and stay silent.", "Broadcast a reply containing Earth's peaceful greetings in secret."] },
      { text: "The reply was broadcast. The military arrests you for violating national security acts. They offer to drop charges if you build a weapon system using the alien genetic data.", choices: ["Refuse to build the weapon system.", "Agree to build the weapon to secure your freedom and research."] },
      { text: "While building it, you realize the energy source code has a hidden function that could disable Earth's electric grid remotely.", choices: ["Sabotage the weapon project to disable the backdoor.", "Deploy the weapon anyway, confident you can control it."] },
      { text: "A colleague is blamed for your sabotage. The military threatens to execute him for treason. Do you confess?", choices: ["Confess to save your colleague.", "Let him take the blame to complete your sabotage research."] },
      { text: "You escaped the base. A foreign agency offers to shelter you if you share the alien data with them.", choices: ["Share the data with the foreign agency for asylum.", "Refuse, keeping the alien data hidden from all governments."] },
      { text: "The alien signal sends a countdown. The public is panicking. Do you broadcast the clean energy patch to the world, even if it reveals your location?", choices: ["Broadcast the patch to save Earth's power grid.", "Keep the patch offline to protect your hidden location."] },
      { text: "The countdown expires. No ships arrive, but Earth's tech has advanced. Do you regret receiving the signal?", choices: ["Yes. Cosmic secrets are too dangerous for humanity.", "No. Progress requires taking existential risks."] },
      { text: "You are asked to head a new global space defense unit. Do you accept?", choices: ["Accept the post to guide space security protocols.", "Refuse, choosing to work as an independent researcher."] }
    ],
    endings: [
      { ending_id: "end_signal_pioneer", summary: "You shared the cosmic data. Humanity entered a new age of clean energy, but you live in permanent exile.", dominant_traits: ["Idealistic", "Independent"], behavioral_analysis: "You prioritize global progress and scientific freedom over state commands and personal security." },
      { ending_id: "end_signal_warden", summary: "You helped build Earth's space defense system. You are a powerful security official, but humanity remains isolated.", dominant_traits: ["Institutional", "Warden"], behavioral_analysis: "You prioritize national security, defense protocols, and state authority over open scientific sharing." }
    ]
  },
  {
    id: "sc_027",
    title: "The Jury",
    core_conflict: "Justice vs Mercy",
    pressure_type: "Legal pressure",
    relationship_dynamic: "Jury panel",
    stakes_type: "Justice",
    tone: "Tense, deliberation room, rain on glass",
    layersCount: 10,
    axisPoles: { A: { Justice: 2, Idealism: 1, Compassion: 2 }, B: { Rationality: 2, Justice: 2, Compassion: -2 } },
    nodesData: [
      { text: "You are a juror in a trial where a father is accused of killing the abuser who targeted his child. The law says it is first-degree murder. Do you vote guilty?", choices: ["Vote guilty according to the letter of the law.", "Vote not guilty, sympathizing with the father's vigilante act."] },
      { text: "The jury is split 11-1. You are the only holdout. The other jurors pressure you to change your vote to reach a unanimous verdict so they can go home.", choices: ["Hold your ground, refusing to change your vote.", "Yield to the pressure and vote with the majority."] },
      { text: "You discover one of the jurors has been researching the case online, violating court rules. Reporting this will declare a mistrial, forcing a new trial.", choices: ["Report the juror violation to the judge immediately.", "Keep quiet to let the current jury reach a verdict."] },
      { text: "A mistrial is declared. The defense attorney asks you to meet privately. He asks you to write an affidavit describing the jury room pressure to help get the charges reduced.", choices: ["Write the affidavit to help the father.", "Refuse to get involved in post-trial legal strategy."] },
      { text: "The prosecutor learns of your affidavit and threatens to charge you with jury tampering if you don't retract it.", choices: ["Hold firm and refuse to retract your statement.", "Retract the statement to avoid personal legal risk."] },
      { text: "The new trial begins. The father's child begs you to help them pay for a private defense lawyer. You must donate your savings.", choices: ["Donate your savings to the child's defense fund.", "Refuse, keeping your assets secure."] },
      { text: "The father is convicted in the second trial. Do you write a public letter to the governor demanding a pardon, risking public backlash?", choices: ["Write the public letter demanding a pardon.", "Refuse to intervene in the state's final sentence."] },
      { text: "A local newspaper wants to write a profile on you as the 'Juror who fought for justice'. Do you accept?", choices: ["Accept the profile to keep the case in the public eye.", "Refuse the profile to protect your privacy."] },
      { text: "The governor pardons the father, but he immediately kills another suspect. The media blames the public pressure you started.", choices: ["Accept responsibility for your role in the public campaign.", "Defend your campaign as a support for parental protection."] },
      { text: "Looking back, do you believe the legal system is capable of true justice?", choices: ["Yes. Rules must be applied without emotional bias.", "No. The system is too rigid to understand human morality."] }
    ],
    endings: [
      { ending_id: "end_jury_righteous", summary: "You fought for the father's freedom and won, but his subsequent actions left you carrying a heavy moral burden.", dominant_traits: ["Compassionate", "Idealistic"], behavioral_analysis: "You prioritize human empathy and moral exceptions over rigid legal codes." },
      { ending_id: "end_jury_systemic", summary: "You voted strictly by the law. The father went to prison. You kept your hands clean and the rules were upheld.", dominant_traits: ["Systemic", "Calculating"], behavioral_analysis: "You prioritize the integrity of the legal system and objective rules over individual moral exceptions." }
    ]
  },
  {
    id: "sc_028",
    title: "The Treaty",
    core_conflict: "Diplomacy vs Sovereignty",
    pressure_type: "State negotiation",
    relationship_dynamic: "Negotiators",
    stakes_type: "War / Peace",
    tone: "Diplomatic, mahogany table, secure feeds",
    layersCount: 9,
    axisPoles: { A: { Diplomacy: 2, Idealism: 1, Obedience: 2 }, B: { Independence: 2, Courage: 2, Diplomacy: -2 } },
    nodesData: [
      { text: "You are the lead diplomat negotiating a peace treaty with a hostile invader. They demand you cede 20% of your country's agricultural border lands to stop the invasion.", choices: ["Cede the border lands to secure immediate peace.", "Refuse to cede any territory, continuing the war."] },
      { text: "Your president orders you to sign a secret annex to the treaty that allows the invader to monitor your country's communications grid.", choices: ["Sign the secret communications annex as ordered.", "Refuse to sign the annex, risking a breakdown of the negotiations."] },
      { text: "You refused the annex. The invader launches a fresh artillery barrage on a border city. They offer to stop if you sign the treaty immediately.", choices: ["Sign the treaty immediately to stop the shelling.", "Hold out for better terms, accepting the civilian casualties in the city."] },
      { text: "A colleague offers to leak the invader's secret plans to help your negotiations, but doing so violates diplomatic immunity protocols.", choices: ["Use the leaked plans to gain leverage in the talks.", "Refuse the plans to maintain clean diplomatic protocols."] },
      { text: "The invader discovers you have their plans and threatens to walk away from the table unless you resign and hand over the leak source.", choices: ["Resign and name the source to save the treaty.", "Refuse to resign or name the source, preparing for full-scale war."] },
      { text: "You stayed. A foreign superpower offers to send military aid if you agree to let them build permanent military bases on your territory post-war.", choices: ["Accept the military aid and base contract.", "Refuse the bases to maintain absolute national sovereignty."] },
      { text: "The treaty is signed, but it is highly controversial. A crowd of citizens surrounds your hotel, calling you a traitor. Do you go out to address them?", choices: ["Go out and explain the treaty choices to the crowd.", "Stay inside and request police protection to clear the street."] },
      { text: "The peace holds, but the ceded border lands are annexed. The local farmers there are evicted. Do you fund their relocation from your department's budget?", choices: ["Fund the farmer relocation program.", "Refuse, stating the budget must focus on national defense."] },
      { text: "Years later, do you believe peace is worth any price?", choices: ["Yes. A bad peace is better than a good war.", "No. Sovereignty and honor are worth fighting to the death."] }
    ],
    endings: [
      { ending_id: "end_treaty_pacifist", summary: "You signed the treaty and secured peace, saving millions of lives, but your country lost territory and sovereignty.", dominant_traits: ["Pacifist", "Diplomatic"], behavioral_analysis: "You prioritize the preservation of human life and diplomatic compromise over national pride and territory." },
      { ending_id: "end_treaty_nationalist", summary: "You refused to yield. The war continued and many died, but your country maintained its absolute sovereignty and honor.", dominant_traits: ["Courageous", "Independent"], behavioral_analysis: "You prioritize national sovereignty, territorial integrity, and honor over diplomatic compromise." }
    ]
  }
];

// Perform programmatic check for ID or title overlaps before running modifications
scenarioTemplates.forEach(t => {
  if (existingIds.has(t.id.toLowerCase())) {
    throw new Error(`OVERLAP DETECTED: Scenario ID "${t.id}" already exists in the scenarios database!`);
  }
  if (existingTitles.has(t.title.toLowerCase())) {
    throw new Error(`OVERLAP DETECTED: Scenario Title "${t.title}" already exists in the scenarios database!`);
  }
});

// Construct and push new scenarios since no overlaps exist
scenarioTemplates.forEach(t => {
  const scenarioNodes = [];
  
  t.nodesData.forEach((nd, idx) => {
    const layerNum = idx + 1;
    const isLastNode = layerNum === t.layersCount;
    const nodeId = `n_${layerNum}`;
    
    const choiceA_next = isLastNode ? t.endings[0].ending_id : `n_${layerNum + 1}`;
    const choiceB_next = isLastNode ? t.endings[1].ending_id : `n_${layerNum + 1}`;
    
    const effectsA = t.axisPoles.A;
    const effectsB = t.axisPoles.B;
    
    const choices = [
      {
        choice_id: `c_${t.id}_${layerNum}_a`,
        text: nd.choices[0],
        effects: effectsA,
        flags_set: { [`flag_${t.id}_${layerNum}_a`]: true },
        next_node: choiceA_next
      },
      {
        choice_id: `c_${t.id}_${layerNum}_b`,
        text: nd.choices[1],
        effects: effectsB,
        flags_set: { [`flag_${t.id}_${layerNum}_b`]: true },
        next_node: choiceB_next
      }
    ];

    if (layerNum % 3 === 0) {
      choices.push({
        choice_id: `c_${t.id}_${layerNum}_c`,
        text: "Hesitate and request more information from secondary channels.",
        effects: { Rationality: 1, Courage: -1, Pragmatism: -1 },
        flags_set: { [`flag_${t.id}_${layerNum}_c`]: true },
        next_node: choiceB_next
      });
    }

    const node = {
      node_id: nodeId,
      text: nd.text,
      pressure_context: `Evaluation Layer ${layerNum} / ${t.layersCount}`,
      visibility: "always",
      required_flags: [],
      choices: choices
    };

    if (layerNum === 4 || layerNum === 8) {
      node.timer_seconds = 8 + Math.floor(Math.random() * 5); // 8-12 seconds
    }

    scenarioNodes.push(node);
  });

  const fullScenario = {
    scenario_id: t.id,
    title: t.title,
    core_conflict: t.core_conflict,
    pressure_type: t.pressure_type,
    relationship_dynamic: t.relationship_dynamic,
    stakes_type: t.stakes_type,
    tone: t.tone,
    escalation_type: t.escalation_type,
    nodes: scenarioNodes,
    endings: t.endings
  };

  scenarios.push(fullScenario);
});

// Write back to scenarios.json
fs.writeFileSync(scenariosPath, JSON.stringify(scenarios, null, 2), 'utf8');
console.log(`Successfully generated, verified, and appended ${scenarioTemplates.length} scenarios! Total scenarios now: ${scenarios.length}`);
